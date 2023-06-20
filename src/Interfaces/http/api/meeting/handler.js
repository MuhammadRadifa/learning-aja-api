const AddMeetingUseCase = require("../../../../Applications/use_case/AddMeetingUseCase");
const GetMeetingUseCase = require("../../../../Applications/use_case/GetMeetingUseCase");
const GetMeetingDetailUseCase = require("../../../../Applications/use_case/GetMeetingDetailUseCase");
const GetUserMeetingUseCase = require("../../../../Applications/use_case/GetUserMeetingUseCase");
const DeleteMeetingUseCase = require("../../../../Applications/use_case/DeleteMeetingUseCase");

class MeetingHandler {
  constructor(container) {
    this._container = container;

    this.postMeetingHandler = this.postMeetingHandler.bind(this);
    this.getMeetingsHandler = this.getMeetingsHandler.bind(this);
    this.getMeetingByIdHandler = this.getMeetingByIdHandler.bind(this);
    this.deleteMeetingByIdHandler = this.deleteMeetingByIdHandler.bind(this);
    this.getUsersMeetingHandler = this.getUsersMeetingHandler.bind(this);
  }

  async postMeetingHandler(request, h) {
    const addMeetingUseCase = this._container.getInstance(
      AddMeetingUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      ...request.payload,
      ownerId: credentialId,
    };

    const addedMeeting = await addMeetingUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "Meeting berhasil ditambahkan",
      data: {
        addedMeeting,
      },
    });
    response.code(201);
    return response;
  }

  async getMeetingsHandler() {
    const getMeetingsUseCase = this._container.getInstance(
      GetMeetingUseCase.name
    );
    const meetings = await getMeetingsUseCase.execute();

    return {
      status: "success",
      data: {
        meetings,
      },
    };
  }

  async getMeetingByIdHandler(request) {
    const getMeetingDetailUseCase = this._container.getInstance(
      GetMeetingDetailUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      ...request.params,
      userId: credentialId,
    };

    const meeting = await getMeetingDetailUseCase.execute(useCasePayload);

    return {
      status: "success",
      data: {
        meeting,
      },
    };
  }

  async deleteMeetingByIdHandler(request) {
    const deleteMeetingUseCase = this._container.getInstance(
      DeleteMeetingUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      ...request.params,
      userId: credentialId,
    };

    await deleteMeetingUseCase.execute(useCasePayload);

    return {
      status: "success",
      message: "Meeting berhasil dihapus",
    };
  }

  async getUsersMeetingHandler(request) {
    const getUserMeetingUseCase = this._container.getInstance(
      GetUserMeetingUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      ...request.params,
      userId: credentialId,
    };

    const participants = await getUserMeetingUseCase.execute(useCasePayload);

    return {
      status: "success",
      data: {
        participants,
      },
    };
  }
}

module.exports = MeetingHandler;
