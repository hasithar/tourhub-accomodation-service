import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import Amenity from "../models/amenity.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Amenity Endpoints", () => {
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

  // test POST /amenities endpoint
  describe("POST /amenities", () => {
    it("should create a new amenity", async () => {
      const res = await request(app).post("/amenities").send({
        name: "Sample Amenity",
        description: "Sample amenity description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Amenity");
      expect(res.body).to.have.property(
        "description",
        "Sample amenity description"
      );
    });

    it("should not create a amenity with an existing name", async () => {
      await new Amenity({
        name: "Sample Amenity",
        description: "Sample amenity description",
      }).save();

      const res = await request(app).post("/amenities").send({
        name: "Sample Amenity",
        description: "Sample amenity description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /amenities endpoint
  describe("GET /amenities", () => {
    it("should fetch all amenities", async () => {
      await new Amenity({
        name: "Sample Amenity",
        description: "Sample amenity description",
      }).save();
      await new Amenity({
        name: "Sample Amenity 2",
        description: "Sample amenity 2 description",
      }).save();

      const res = await request(app).get("/amenities");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /amenities/:id endpoint
  describe("GET /amenities/:id", () => {
    it("should fetch a amenity by ID", async () => {
      const amenity = await new Amenity({
        name: "Sample Amenity",
        description: "Sample amenity description",
      }).save();

      const res = await request(app).get(`/amenities/${amenity._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Amenity");
      expect(res.body).to.have.property(
        "description",
        "Sample amenity description"
      );
    });

    it("should return 404 if amenity not found", async () => {
      const nonExistentAmenityId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/amenities/${nonExistentAmenityId}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Amenity not found.");
    });
  });

  // test PATCH /amenities/:id endpoint
  describe("PATCH /amenities/:id", () => {
    it("should update a amenity", async () => {
      const amenity = await new Amenity({
        name: "Sample Amenity",
        description: "Sample amenity description",
      }).save();

      const res = await request(app)
        .patch(`/amenities/${amenity._id}`)
        .send({ description: "Sample amenity updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample amenity updated description"
      );
    });

    it("should return 404 if amenity not found", async () => {
      const nonExistentAmenityId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/amenities/${nonExistentAmenityId}`)
        .send({ description: "Sample amenity updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Amenity not found.");
    });
  });

  // test DELETE /amenities/:id endpoint
  describe("DELETE /amenities/:id", () => {
    it("should delete a amenity", async () => {
      const amenity = await new Amenity({
        name: "Sample Amenity",
        description: "Sample amenity description",
      }).save();

      const res = await request(app).delete(`/amenities/${amenity._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Amenity deleted successfully."
      );

      const deletedAmenity = await Amenity.findById(amenity._id);
      expect(deletedAmenity).to.be.null;
    });

    it("should return 404 if amenity not found", async () => {
      const nonExistentAmenityId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/amenities/${nonExistentAmenityId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Amenity not found.");
    });
  });
});
