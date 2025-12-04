import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { NotificationDTO } from "../models/notification.dto";

class NotificationService  {

    async pushConnectionNotification(data: NotificationDTO) {
        return (await axios.post(`${BASE_API}/notifications/send`, data))
    }



}

const notificationService = new NotificationService();
export default notificationService;