// Generated by Xata Codegen 0.29.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "servers",
    columns: [
      { name: "serverName", type: "string", defaultValue: "" },
      { name: "serverConfiguration", type: "json" },
    ],
  },
  {
    name: "connection",
    columns: [
      { name: "serverID", type: "string" },
      { name: "userID", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Servers = InferredTypes["servers"];
export type ServersRecord = Servers & XataRecord;

export type Connection = InferredTypes["connection"];
export type ConnectionRecord = Connection & XataRecord;

export type DatabaseSchema = {
  servers: ServersRecord;
  connection: ConnectionRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Gurvir-Singh-s-workspace-1fjfko.eu-central-1.xata.sh/db/mc",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};