import _SERVER from "./server/Server";

const _PORT: string | number = process.env.PORT || 2345;

_SERVER.listen(_PORT, () => `Server running in http://localhost:${_PORT}`);