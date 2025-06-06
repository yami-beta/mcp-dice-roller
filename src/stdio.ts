import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { setupTools } from "./mcp.ts";

const main = async () => {
  const server = new McpServer({
    name: "dice-roller",
    version: "0.0.1",
  });
  setupTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
