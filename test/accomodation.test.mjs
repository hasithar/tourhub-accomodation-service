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

  // test POST /accomodations endpoint
  describe("POST /accomodations", () => {
    it("should create a new accomodation", async () => {
      const res = await request(app).post("/accomodations").send({
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
  });

  // test GET /accomodations endpoint
  describe("GET /accomodations", () => {
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

      const res = await request(app).get("/accomodations");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /accomodations/:id endpoint
  describe("GET /accomodations/:id", () => {
    it("should fetch a accomodation by ID", async () => {
      const accomodation = await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app).get(`/accomodations/${accomodation._id}`);

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
        `/accomodations/${nonExistentAccomodationId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Accomodation not found.");
    });
  });

  // test PATCH /accomodations/:id endpoint
  describe("PATCH /accomodations/:id", () => {
    it("should update a accomodation", async () => {
      const accomodation = await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app)
        .patch(`/accomodations/${accomodation._id}`)
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
        .patch(`/accomodations/${nonExistentAccomodationId}`)
        .send({ description: "Sample accomodation updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Accomodation not found.");
    });
  });

  // test DELETE /accomodations/:id endpoint
  describe("DELETE /accomodations/:id", () => {
    it("should delete a accomodation", async () => {
      const accomodation = await new Accomodation({
        name: "Sample accomodation name",
        type: new mongoose.Types.ObjectId(),
        description: "Sample accomodation description",
      }).save();

      const res = await request(app).delete(
        `/accomodations/${accomodation._id}`
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
        `/accomodations/${nonExistentAccomodationId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Accomodation not found.");
    });
  });
});
