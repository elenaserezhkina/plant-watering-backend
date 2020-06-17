const supertest = require("supertest");
const request = supertest("http://localhost:8080");
const repository = require("../controllers/plant");
const app = require("../app");

let server;

describe("HTTP API", () => {
  //make before tests
  before((next) => {
    //we write "next" so our server will run first and only after that the next function will be executed(start tests)
    server = app.listen(8080, next);
    // 8080 is a port on which we will listen
    // app listen returns object http server that we need to save in variable "server" to be able to close server later(in after tests)
  });

  // Start tests
  // Get all the Plants
  describe("GET /plants", () => {
    it("should return status code 200", () => {
      return request
        .get("/plants")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8") //check if responce has application/json file
        .expect((res) => {
          // function that takes responce and check if it contains string name.

          if (!res.text.includes("name")) {
            throw new Error("Invalid body");
          }
        });
    });
  });

  //Create a Plant
  describe("POST /plants", () => {
    it("should return status code 302", () => {
      return request.post("/plants").send("name=Some plant").expect(201);
    });
    it("should have the new plant in the plant base", () => {
      return request.get("/plants").expect((res) => {
        if (!res.text.includes("Some plant")) {
          throw new Error("new plant not found");
        }
      });
    });
  });

  // Delete a Plant
  describe("DELETE /plants/:id", () => {
    let id;
    const createPlant = async () => {
      //await till this plant creates and sends something
      const createdPlant = await request
        .post("/plants")
        .send("name=this plant will be deleted");

      id = createdPlant.body.result._id;
    };
    before(createPlant);
    it("should return status 200 delete plant with id", () => {
      return request.delete(`/plants/${id}`).expect(200);
    });
    it("should check that the plant was deleted", () => {
      return request.get(`/plants/${id}`).expect(404);
    });
  });

  // Update Plant
  describe("Patch /plants", () => {
    let id;
    const createPlant = async () => {
      //await till this plant creates and sends something
      const createdPlant = await request
        .post("/plants")
        .send("name=plant to change");
      id = createdPlant.body.result._id;
    };

    before(createPlant);
    it("should return status 200 update plant with id", () => {
      return request.patch(`/plants/${id}`).send("name=Some plant").expect(200);
    });
    it("should check that the plant was updated", () => {
      return request.get(`/plants/${id}`).expect((res) => {
        if (res.body.result.name !== "Some plant") {
          throw new Error("plant wasn't updated");
        }
      });
    });
  });

  after(() => {
    server.close();
  });
  after(() => app.disconnect());
});
