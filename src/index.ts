import { McpAgent } from "agents/mcp";
import { setupTools } from "./mcp.ts";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: "dice-roller",
    version: "0.0.1",
  });

  async init() {
    setupTools(this.server);
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
