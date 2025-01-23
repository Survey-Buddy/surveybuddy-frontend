import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  updateSurvey,
  createSurvey,
  getSurveys,
  getSurveyData,
  deleteSurvey,
} from "../../utils/surveyUtils/surveyFunctions";
import { getToken } from "../../utils/jwtToken";
import BASE_URL from "../../config/apiConfig";

// Mock the token utility
vi.mock("../../utils/jwtToken");

describe("Survey API Utils", () => {
  let mock;

  // Setup a new mock adapter before each test
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  // Restore the mock adapter and reset mocks after each test
  afterEach(() => {
    mock.restore();
    vi.resetAllMocks();
  });

  // Mock token for authentication
  const token = "mocked-token";

  describe("updateSurvey", () => {
    it("should update the survey and return the updated survey data", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      const surveyId = "12345";
      const updatedSurvey = { name: "Updated Survey" };
      const mockResponse = { ...updatedSurvey, id: surveyId };

      // Mock the PATCH request and response
      mock
        .onPatch(`${BASE_URL}/surveys/${surveyId}/editSurvey`)
        .reply(200, mockResponse);

      const result = await updateSurvey(surveyId, updatedSurvey);

      // Check that the response matches the mock response
      expect(result).toEqual(mockResponse);
      // Ensure the request included the correct authorization header
      expect(mock.history.patch[0].headers).toMatchObject({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should throw an error if the token is missing", async () => {
      // Simulate a missing token
      vi.mocked(getToken).mockReturnValue(null);

      // Expect an error when the token is missing
      await expect(updateSurvey("12345", {})).rejects.toThrow(
        "User is not authenticated. Token is missing."
      );
    });

    it("should handle axios errors", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      const surveyId = "12345";
      // Mock a 400 response from the server
      mock.onPatch(`${BASE_URL}/surveys/${surveyId}/editSurvey`).reply(400, {
        message: "Bad Request",
      });

      // Expect the function to throw the server's error message
      await expect(updateSurvey(surveyId, {})).rejects.toThrow("Bad Request");
    });
  });

  describe("createSurvey", () => {
    it("should create a survey and return the survey data", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      const newSurvey = { name: "New Survey" };
      const mockResponse = { ...newSurvey, id: "12345" };

      // Mock the POST request and response
      mock.onPost(`${BASE_URL}/surveys`).reply(200, mockResponse);

      const result = await createSurvey(newSurvey);

      // Check that the response matches the mock response
      expect(result).toEqual(mockResponse);
      // Ensure the request included the correct authorization header
      expect(mock.history.post[0].headers).toMatchObject({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should throw an error if the token is missing", async () => {
      // Simulate a missing token
      vi.mocked(getToken).mockReturnValue(null);

      // Expect an error when the token is missing
      await expect(createSurvey({})).rejects.toThrow(
        "User is not authenticated. Token is missing."
      );
    });

    it("should handle axios errors", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      // Mock a 400 response from the server
      mock.onPost(`${BASE_URL}/surveys`).reply(400, { message: "Bad Request" });

      // Expect the function to throw the server's error message
      await expect(createSurvey({})).rejects.toThrow("Bad Request");
    });
  });

  describe("getSurveys", () => {
    it("should fetch and return a sorted list of surveys", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      const mockSurveys = [
        { id: "1", date: "2024-12-01", active: true },
        { id: "2", date: "2024-11-01", active: false },
      ];

      // Mock the GET request and response
      mock.onGet(`${BASE_URL}/surveys/`).reply(200, { data: mockSurveys });

      const result = await getSurveys();

      // Check that the response contains the sorted surveys
      expect(result).toHaveLength(2);
      expect(result[0].date).toEqual("2024-12-01");
    });

    it("should return an empty array if no surveys are found", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      // Mock the GET request and response
      mock.onGet(`${BASE_URL}/surveys/`).reply(200, { data: [] });

      const result = await getSurveys();

      // Check that the response is an empty array
      expect(result).toEqual([]);
    });
  });

  describe("getSurveyData", () => {
    it("should fetch survey data by ID", async () => {
      const surveyId = "12345";
      const mockSurvey = { id: surveyId, name: "Survey Name" };

      // Mock the GET request and response
      mock.onGet(`${BASE_URL}/surveys/${surveyId}`).reply(200, {
        data: mockSurvey,
      });

      const result = await getSurveyData(surveyId);

      // Check that the response matches the mock survey
      expect(result).toEqual(mockSurvey);
    });

    it("should return null if fetching survey data fails", async () => {
      // Mock a 404 response from the server
      mock.onGet(`${BASE_URL}/surveys/12345`).reply(404);

      const result = await getSurveyData("12345");

      // Check that the result is null
      expect(result).toBeNull();
    });
  });

  describe("deleteSurvey", () => {
    it("should delete a survey and return a success response", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      const surveyId = "12345";

      // Mock the DELETE request and response
      mock
        .onDelete(`${BASE_URL}/surveys/${surveyId}/deleteSurvey`)
        .reply(200, { success: true });

      const result = await deleteSurvey(surveyId);

      // Check that the response indicates success
      expect(result).toEqual({ success: true });
      // Ensure the request included the correct authorization header
      expect(mock.history.delete[0].headers).toMatchObject({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should throw an error if the token is missing", async () => {
      // Simulate a missing token
      vi.mocked(getToken).mockReturnValue(null);

      // Expect an error when the token is missing
      await expect(deleteSurvey("12345")).rejects.toThrow("Token not found");
    });

    it("should handle errors gracefully", async () => {
      // Mock the token
      vi.mocked(getToken).mockReturnValue(token);

      // Mock a 400 response from the server
      mock.onDelete(`${BASE_URL}/surveys/12345/deleteSurvey`).reply(400);

      const result = await deleteSurvey("12345");

      // Check that the result is null
      expect(result).toBeNull();
    });
  });
});
