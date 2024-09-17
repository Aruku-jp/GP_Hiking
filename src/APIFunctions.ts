import axios, { AxiosResponse } from "axios";
const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
import emailjs from "@emailjs/browser";
import { Message } from "@mui/icons-material";

// Comments

export class Comment {
  user: number | undefined;
  userName: string;
  trail_id: number;
  comment: string;
  date: string;

  constructor(
    user: number | undefined,
    userName: string,
    trailID: number,
    comment: string,
    date: string
  ) {
    this.user = user;
    this.userName = userName;
    this.trail_id = trailID;
    this.comment = comment;
    this.date = date;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/comments`, "get");
  }

  static async post(newComment: Comment) {
    return await backendReq("trails/comments", "post", newComment);
  }
}

// Likes

export class Like {
  user: number | undefined;
  trail_id: number;
  like: boolean;

  constructor(user: number | undefined, trailID: number, like: boolean) {
    this.user = user;
    this.trail_id = trailID;
    this.like = like;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/likes`, "get");
  }

  static async post(newLike: Like) {
    return await backendReq("trails/likes", "post", newLike);
  }

  static async put(updatedLike: Like, recordID: number) {
    return await backendReq(`trails/likes/${recordID}`, "put", updatedLike);
  }
}

// Completed Trails

export class CompletedTrail {
  user: number | undefined;
  trail_id: number;
  completion: boolean;
  date: string;

  constructor(
    user: number | undefined,
    trailID: number,
    completion: boolean,
    date: string
  ) {
    this.user = user;
    this.trail_id = trailID;
    this.completion = completion;
    this.date = date;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/completions`, "get");
  }

  static async post(newCompletedTrail: CompletedTrail) {
    return await backendReq("trails/completions", "post", newCompletedTrail);
  }

  static async put(updatedCompletedTrail: CompletedTrail, recordID: number) {
    return await backendReq(
      `trails/completions/${recordID}`,
      "put",
      updatedCompletedTrail
    );
  }
}

// Geolocation Messages

export class GeolocationMessage {
  user: number | undefined;
  trail_id: number;
  latitude: number;
  longitude: number;
  message: string;
  date: string;

  constructor(
    user: number | undefined,
    trailID: number,
    latitude: number,
    longitude: number,
    message: string,
    date: string
  ) {
    this.user = user;
    this.trail_id = trailID;
    this.latitude = latitude;
    this.longitude = longitude;
    this.message = message;
    this.date = date;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/messages`, "get");
  }

  static async post(newGeolocationMessage: GeolocationMessage) {
    return await backendReq("trails/messages", "post", newGeolocationMessage);
  }
}

// Geolocation Message Likes

export class GeolocationMessageLike {
  user: number | undefined;
  message_id: number | null;
  value: number;
  create_date: string;
  update_date: string | null;

  constructor(
    user: number | undefined,
    messageID: number | null,
    value: number,
    create_date: string,
    update_date: string | null
  ) {
    this.user = user;
    this.message_id = messageID;
    this.value = value;
    this.create_date = create_date;
    this.update_date = update_date;
  }

  static async getAllByID(messageID: number | null) {
    return await backendReq(`trails/messages/${messageID}/likes`, "get");
  }

  static async post(newGeolocationMessageLike: GeolocationMessageLike) {
    return await backendReq(
      "trails/messages/likes",
      "post",
      newGeolocationMessageLike
    );
  }

  static async put(
    updatedGeolocationMessageLike: GeolocationMessageLike,
    recordID: number | null
  ) {
    return await backendReq(
      `trails/messages/likes/${recordID}`,
      "put",
      updatedGeolocationMessageLike
    );
  }
}

// Message Reports

export class MessageReport {
  from_user: number | undefined;
  message_id: number | null;
  reason: string;
  date: string;
  message: string;
  resolved: boolean;

  constructor(
    from_user: number | undefined,
    message_id: number | null,
    reason: string,
    date: string,
    message: string,
    resolved: boolean
  ) {
    this.from_user = from_user;
    this.message_id = message_id;
    this.reason = reason;
    this.date = date;
    this.message = message;
    this.resolved = resolved;
  }

  static async create(newMessageReport: MessageReport) {
    const serviceID: string = process.env.NEXT_PUBLIC_SERVICE_ID!;
    const templateID: string = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
    const publicKey: string = process.env.NEXT_PUBLIC_KEY!;

    emailjs
      .send(serviceID, templateID, { ...newMessageReport }, publicKey)
      .then(
        (response) => {
          console.log(response.status, response.text);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}

// API Call Wrapper

export async function backendReq(path: string, method: string, data?: object) {
  const url = `${backend}api/${path}`;

  let res: AxiosResponse<any, any>;

  try {
    switch (method) {
      case "get":
        res = await axios({
          method: "get",
          url: url,
        });
        return res;

      case "post":
        res = await axios({
          method: "post",
          url: url,
          data: data,
        });
        return res;

      case "put":
        res = await axios({
          method: "put",
          url: url,
          data: data,
        });
        return res;
    }
  } catch (error) {
    console.error(error);
  }
}
