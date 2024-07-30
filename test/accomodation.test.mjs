import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import Accomodation from "../models/accomodation.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Accomodation Endpoints", () => {
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

  // test POST /accommodations endpoint
  describe("POST /accommodations", () => {
    it("should create a new accomodation", async () => {
      const res = await request(app).post("/accommodations").send({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample accomodation name");
      expect(res.body).to.have.property(
        "description",
        "Sample accomodation description"
      );
    });

    it("should not create a accomodation with an existing name", async () => {
      await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app).post("/accommodations").send({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /accommodations endpoint
  describe("GET /accommodations", () => {
    it("should fetch all accomodations", async () => {
      await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();
      await new Accomodation({
        name: "Sample accomodation 2 name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation 2 description",
      }).save();

      const res = await request(app).get("/accommodations");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /accommodations/:id endpoint
  describe("GET /accommodations/:id", () => {
    it("should fetch a accomodation by ID", async () => {
      const accomodation = await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app).get(`/accommodations/${accomodation._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample accomodation name");
      expect(res.body).to.have.property(
        "description",
        "Sample accomodation description"
      );
    });

    it("should return 404 if accomodation not found", async () => {
      const nonExistentAccomodationId = new mongoose.Types.ObjectId();
      const res = await request(app).get(
        `/accommodations/${nonExistentAccomodationId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Accomodation not found.");
    });
  });

  // test PATCH /accommodations/:id endpoint
  describe("PATCH /accommodations/:id", () => {
    it("should update a accomodation", async () => {
      const accomodation = await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app)
        .patch(`/accommodations/${accomodation._id}`)
        .send({ description: "Sample accomodation updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample accomodation updated description"
      );
    });

    it("should return 404 if accomodation not found", async () => {
      const nonExistentAccomodationId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/accommodations/${nonExistentAccomodationId}`)
        .send({ description: "Sample accomodation updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Accomodation not found.");
    });
  });

  // test DELETE /accommodations/:id endpoint
  describe("DELETE /accommodations/:id", () => {
    it("should delete a accomodation", async () => {
      const accomodation = await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app).delete(
        `/accommodations/${accomodation._id}`
      );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Accomodation deleted successfully."
      );

      const deletedAccomodation = await Accomodation.findById(accomodation._id);
      expect(deletedAccomodation).to.be.null;
    });

    it("should return 404 if accomodation not found", async () => {
      const nonExistentAccomodationId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/accommodations/${nonExistentAccomodationId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Accomodation not found.");
    });
  });
});
