import IGetDeviceByIdPort from '../../../../ports/input/devices/IGetDeviceByIdPort';
import RestError from '../../../../utils/restError';
import validate from 'uuid-validate';

export default function getDeviceByIdFactory(getDeviceByIdUseCase: IGetDeviceByIdPort) {
    return async function getDeviceById(req: any, res: any, next: any) {
        try {
            if (!validate(req.params.deviceId)) {
                const errorMessage = "deviceId is not a valid uuid";
                const restError = RestError(errorMessage);
                res.status(400).json(restError)
                return;
            }

            const device = await getDeviceByIdUseCase.getDeviceById(req.params.deviceId);
            if (!device) {
                const errorMessage = "device not found";
                const restError = RestError(errorMessage);
                res.status(404).json(restError)
            } else {
                res.status(200).json({
                    status: "success",
                    data: device
                });
            }

        } catch (err) {
            console.log("getDeviceById controller err :", err);
            const errorMessage = "server could not process request";
            const restError = RestError(errorMessage);
            res.status(500).json(restError)
        }
    }
}

