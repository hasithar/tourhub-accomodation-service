import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import AccomodationType from "../models/accomodationType.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Accomodation Type Endpoints", () => {
  // runs once before all tests
  before(async () => {
    await connectTestDB();
  });

  // runs once after all tests
  after(async () => {
    await closeTestDB();
  });

  // runs before each test
  beforeEach(async () => {
    await clearTestDB();
  });

  // test POST /accommodation-types endpoint
  describe("POST /accommodation-types", () => {
    it("should create a new accomodation type", async () => {
      const res = await request(app).post("/accommodation-types").send({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Accomodation Type");
      expect(res.body).to.have.property(
        "description",
        "Sample accomodation type description"
      );
    });

    it("should not create a accomodation type with an existing name", async () => {
      await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app).post("/accommodation-types").send({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /accommodation-types endpoint
  describe("GET /accommodation-types", () => {
    it("should fetch all accomodation types", async () => {
      await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();
      await new AccomodationType({
        name: "Sample Accomodation Type 2",
        description: "Sample accomodation type 2 description",
      }).save();

      const res = await request(app).get("/accommodation-types");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /accommodation-types/:id endpoint
  describe("GET /accommodation-types/:id", () => {
    it("should fetch a accomodation type by ID", async () => {
      const accomodationType = await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app).get(
        `/accommodation-types/${accomodationType._id}`
      );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Accomodation Type");
      expect(res.body).to.have.property(
        "description",
        "Sample accomodation type description"
      );
    });

    it("should return 404 if accomodation type not found", async () => {
      const nonExistentAccomodationTypeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(
        `/accommodation-types/${nonExistentAccomodationTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type not found."
      );
    });
  });

  // test PATCH /accommodation-types/:id endpoint
  describe("PATCH /accommodation-types/:id", () => {
    it("should update a accomodation type", async () => {
      const accomodationType = await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app)
        .patch(`/accommodation-types/${accomodationType._id}`)
        .send({ description: "Sample accomodation type updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample accomodation type updated description"
      );
    });

    it("should return 404 if accomodation type not found", async () => {
      const nonExistentAccomodationTypeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/accommodation-types/${nonExistentAccomodationTypeId}`)
        .send({ description: "Sample accomodation type updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type not found."
      );
    });
  });

  // test DELETE /accommodation-types/:id endpoint
  describe("DELETE /accommodation-types/:id", () => {
    it("should delete a accomodation type", async () => {
      const accomodationType = await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app).delete(
        `/accommodation-types/${accomodationType._id}`
      );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type deleted successfully."
      );

      const deletedAccomodationType = await AccomodationType.findById(
        accomodationType._id
      );
      expect(deletedAccomodationType).to.be.null;
    });

    it("should return 404 if accomodation type not found", async () => {
      const nonExistentAccomodationTypeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/accommodation-types/${nonExistentAccomodationTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type not found."
      );
    });
  });
});
