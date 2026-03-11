import Constants from "expo-constants";
import { Platform } from "react-native";

const ENV_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

const getHostFromHostUri = (hostUri?: string | null) => {
  if (!hostUri) return null;

  const cleaned = hostUri.replace(/^[a-zA-Z]+:\/\//, "").split("/")[0];
  const host = cleaned.split(":")[0];
  if (!host) return null;

  if (Platform.OS === "android" && host === "localhost") {
    return "10.0.2.2";
  }

  return host;
};

const getDevServerHost = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.expoGoConfig?.hostUri ??
    (Constants.manifest as { debuggerHost?: string } | null)?.debuggerHost ??
    (Constants.manifest2 as { extra?: { expoClient?: { hostUri?: string } } } | null)?.extra
      ?.expoClient?.hostUri;

  return getHostFromHostUri(hostUri);
};

const devHost = getDevServerHost();
const devBaseUrl = devHost ? `http://${devHost}:3001` : null;

export const API_BASE_URL = normalizeBaseUrl(
  ENV_BASE_URL && ENV_BASE_URL.length > 0
    ? ENV_BASE_URL
    : devBaseUrl ?? "http://localhost:3001"
);
