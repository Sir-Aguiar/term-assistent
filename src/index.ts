import axios from "axios";
import { Transform, Writable } from "stream";

/* import axios from "axios";
import { writeFile } from "fs";
import { resolve } from "path";

const URL = "https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt";

const serverRequest = async () => (await axios.get(URL)).data;
serverRequest().then((res: string) => {
  const resArray = res.split("\n");
  const possibleWords = resArray.filter((word) => word.length == 5);
  writeFile(resolve(__dirname, "../", "words.json"), JSON.stringify({ words: possibleWords }), () => {});
});
 */

const URL = "http://localhost:3333/";

const serverRequest = async () => (await axios.get(URL, { responseType: "stream" })).data;

(async () => {
  const SERVER_RESPOSE = await serverRequest();
  SERVER_RESPOSE.pipe(
    new Writable({
      write(chunk: Buffer, encoding, callback) {
        console.log(chunk.toString());
        callback();
      },
    }),
  );
})();
