import { ReadStream, createReadStream, readFileSync, writeFileSync } from "fs";
import { createServer } from "http";
import { resolve } from "path";
import { Readable } from "stream";

async function logChunks(readable: ReadStream) {
  for await (const chunk of readable) {
  }
}

const httpServer = createServer(async (req, res) => {
  console.log("[REQUEST RECEIVED]");

  const readable = createReadStream(resolve(__dirname, "../", "../", "allWords.csv"), { encoding: "utf8" });

  const READABLE = new Readable({
    async read() {
      for await (const chunk of readable) {
        chunk
          .toString()
          .split(",")
          .forEach((word:string) => {
            if (word.length == 6) this.push(word);
          });
      }
      this.push(null);
    },
  });
  READABLE.pipe(res);
});

httpServer.listen(3333);
