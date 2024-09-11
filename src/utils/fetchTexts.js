import { fetch } from "./authFetch"

export const getSiteTexts = async () => {
    const { data } = await fetch(`${process.env.REACT_APP_SERVER_URL}/text.json`, "GET");
    return data;
}