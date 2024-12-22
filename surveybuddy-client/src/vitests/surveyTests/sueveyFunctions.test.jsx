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

vi.mock("../../utils/jwtToken");

describe("Survey API Utils", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
    vi.resetAllMocks();
  });

  const token = "mocked-token";

  describe("updateSurvey", () => {
    it("should update the survey and return the updated survey data", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      const surveyId = "12345";
      const updatedSurvey = { name: "Updated Survey" };
      const mockResponse = { ...updatedSurvey, id: surveyId };

      mock
        .onPatch(`${BASE_URL}/surveys/${surveyId}/editSurvey`)
        .reply(200, mockResponse);

      const result = await updateSurvey(surveyId, updatedSurvey);

      expect(result).toEqual(mockResponse);
      expect(mock.history.patch[0].headers).toMatchObject({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should throw an error if the token is missing", async () => {
      vi.mocked(getToken).mockReturnValue(null);
      await expect(updateSurvey("12345", {})).rejects.toThrow(
        "User is not authenticated. Token is missing."
      );
    });

    it("should handle axios errors", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      const surveyId = "12345";
      mock.onPatch(`${BASE_URL}/surveys/${surveyId}/editSurvey`).reply(400, {
        message: "Bad Request",
      });

      await expect(updateSurvey(surveyId, {})).rejects.toThrow("Bad Request");
    });
  });

  describe("createSurvey", () => {
    it("should create a survey and return the survey data", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      const newSurvey = { name: "New Survey" };
      const mockResponse = { ...newSurvey, id: "12345" };

      mock.onPost(`${BASE_URL}/surveys`).reply(200, mockResponse);

      const result = await createSurvey(newSurvey);

      expect(result).toEqual(mockResponse);
      expect(mock.history.post[0].headers).toMatchObject({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should throw an error if the token is missing", async () => {
      vi.mocked(getToken).mockReturnValue(null);
      await expect(createSurvey({})).rejects.toThrow(
        "User is not authenticated. Token is missing."
      );
    });

    it("should handle axios errors", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      mock.onPost(`${BASE_URL}/surveys`).reply(400, { message: "Bad Request" });

      await expect(createSurvey({})).rejects.toThrow("Bad Request");
    });
  });

  describe("getSurveys", () => {
    it("should fetch and return a sorted list of surveys", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      const mockSurveys = [
        { id: "1", date: "2024-12-01", active: true },
        { id: "2", date: "2024-11-01", active: false },
      ];
      mock.onGet(`${BASE_URL}/surveys/`).reply(200, { data: mockSurveys });

      const result = await getSurveys();

      expect(result).toHaveLength(2);
      expect(result[0].date).toEqual("2024-12-01");
    });

    it("should return an empty array if no surveys are found", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      mock.onGet(`${BASE_URL}/surveys/`).reply(200, { data: [] });

      const result = await getSurveys();

      expect(result).toEqual([]);
    });
  });

  describe("getSurveyData", () => {
    it("should fetch survey data by ID", async () => {
      const surveyId = "12345";
      const mockSurvey = { id: surveyId, name: "Survey Name" };

      mock.onGet(`${BASE_URL}/surveys/${surveyId}`).reply(200, {
        data: mockSurvey,
      });

      const result = await getSurveyData(surveyId);

      expect(result).toEqual(mockSurvey);
    });

    it("should return null if fetching survey data fails", async () => {
      mock.onGet(`${BASE_URL}/surveys/12345`).reply(404);

      const result = await getSurveyData("12345");

      expect(result).toBeNull();
    });
  });

  describe("deleteSurvey", () => {
    it("should delete a survey and return a success response", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      const surveyId = "12345";

      mock
        .onDelete(`${BASE_URL}/surveys/${surveyId}/deleteSurvey`)
        .reply(200, { success: true });

      const result = await deleteSurvey(surveyId);

      expect(result).toEqual({ success: true });
      expect(mock.history.delete[0].headers).toMatchObject({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should throw an error if the token is missing", async () => {
      vi.mocked(getToken).mockReturnValue(null);

      await expect(deleteSurvey("12345")).rejects.toThrow("Token not found");
    });

    it("should handle errors gracefully", async () => {
      vi.mocked(getToken).mockReturnValue(token);
      mock.onDelete(`${BASE_URL}/surveys/12345/deleteSurvey`).reply(400);

      const result = await deleteSurvey("12345");

      expect(result).toBeNull();
    });
  });
});
