import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const server = new McpServer({
  name: "dice-roller",
  version: "0.0.1",
});

server.tool(
  "roll-the-dice",
  "指定した面のサイコロを振り出た目を返します",
  { sides: z.number().min(1).describe("サイコロの面を指定します") },
  async ({ sides }) => {
    const v = Math.floor(Math.random() * sides) + 1;

    return {
      content: [
        {
          type: "text",
          text: `${v}`,
        },
      ],
    };
  },
);
