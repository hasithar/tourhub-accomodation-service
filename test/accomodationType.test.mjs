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

  // test POST /accomodation-types endpoint
  describe("POST /accomodation-types", () => {
    it("should create a new accomodation type", async () => {
      const res = await request(app).post("/accomodation-types").send({
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

      const res = await request(app).post("/accomodation-types").send({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /accomodation-types endpoint
  describe("GET /accomodation-types", () => {
    it("should fetch all accomodation types", async () => {
      await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();
      await new AccomodationType({
        name: "Sample Accomodation Type 2",
        description: "Sample accomodation type 2 description",
      }).save();

      const res = await request(app).get("/accomodation-types");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /accomodation-types/:id endpoint
  describe("GET /accomodation-types/:id", () => {
    it("should fetch a accomodation type by ID", async () => {
      const accomodationType = await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app).get(
        `/accomodation-types/${accomodationType._id}`
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
        `/accomodation-types/${nonExistentAccomodationTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type not found."
      );
    });
  });

  // test PATCH /accomodation-types/:id endpoint
  describe("PATCH /accomodation-types/:id", () => {
    it("should update a accomodation type", async () => {
      const accomodationType = await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app)
        .patch(`/accomodation-types/${accomodationType._id}`)
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
        .patch(`/accomodation-types/${nonExistentAccomodationTypeId}`)
        .send({ description: "Sample accomodation type updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type not found."
      );
    });
  });

  // test DELETE /accomodation-types/:id endpoint
  describe("DELETE /accomodation-types/:id", () => {
    it("should delete a accomodation type", async () => {
      const accomodationType = await new AccomodationType({
        name: "Sample Accomodation Type",
        description: "Sample accomodation type description",
      }).save();

      const res = await request(app).delete(
        `/accomodation-types/${accomodationType._id}`
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
        `/accomodation-types/${nonExistentAccomodationTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property(
        "message",
        "Accomodation Type not found."
      );
    });
  });
});
