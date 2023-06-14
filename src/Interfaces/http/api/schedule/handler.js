const AddScheduleUseCase = require("../../../../Applications/use_case/AddScheduleUseCase");
const DetailScheduleUseCase = require("../../../../Applications/use_case/DetailScheduleUseCase");
const DeleteScheduleUseCase = require("../../../../Applications/use_case/DeleteScheduleUseCase");
const EditScheduleUseCase = require("../../../../Applications/use_case/EditScheduleUseCase");
const GetUserScheduleUseCase = require("../../../../Applications/use_case/GetUserScheduleUseCase");

class ScheduleHandler {
  constructor(container) {
    this._container = container;

    this.postScheduleHandler = this.postScheduleHandler.bind(this);
    this.getScheduleByIdHandler = this.getScheduleByIdHandler.bind(this);
    this.deleteScheduleByIdHandler = this.deleteScheduleByIdHandler.bind(this);
    this.putScheduleByIdHandler = this.putScheduleByIdHandler.bind(this);
    this.getUserScheduleHandler = this.getUserScheduleHandler.bind(this);
  }

  async postScheduleHandler(request, h) {
    const addScheduleUseCase = this._container.getInstance(
      AddScheduleUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      ...request.payload,
      ownerId: credentialId,
    };
    const addedSchedule = await addScheduleUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "jadwal berhasil ditambahkan",
      data: {
        addedSchedule,
      },
    });
    response.code(201);
    return response;
  }

  async getScheduleByIdHandler(request) {
    const detailScheduleUseCase = this._container.getInstance(
      DetailScheduleUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      id: request.params.scheduleId,
      ownerId: credentialId,
    };
    const schedule = await detailScheduleUseCase.execute(useCasePayload);
    return {
      status: "success",
      data: {
        schedule,
      },
    };
  }

  async deleteScheduleByIdHandler(request) {
    const deleteScheduleUseCase = this._container.getInstance(
      DeleteScheduleUseCase.name
    );
    const useCasePayload = {
      scheduleId: request.params.scheduleId,
      ownerId: request.auth.credentials.id,
    };

    await deleteScheduleUseCase.execute(useCasePayload);
    return {
      status: "success",
      message: "jadwal berhasil dihapus",
    };
  }

  async putScheduleByIdHandler(request) {
    const editScheduleUseCase = this._container.getInstance(
      EditScheduleUseCase.name
    );
    const useCasePayload = {
      id: request.params.scheduleId,
      ...request.payload,
      ownerId: request.auth.credentials.id,
    };

    await editScheduleUseCase.execute(useCasePayload);
    return {
      status: "success",
      message: "jadwal berhasil diperbarui",
    };
  }

  async getUserScheduleHandler(request) {
    const getUserScheduleUseCase = this._container.getInstance(
      GetUserScheduleUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      userId: credentialId,
    };

    const schedule = await getUserScheduleUseCase.execute(useCasePayload);
    return {
      status: "success",
      data: {
        schedule,
      },
    };
  }
}

module.exports = ScheduleHandler;
