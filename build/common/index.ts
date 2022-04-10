import { spawn } from "child_process";
import { projectRoot } from "./paths";
export const withTaskName = (name: string, fn: () => Promise<void> | NodeJS.ReadWriteStream) =>
  Object.assign(fn, { displayName: name });

// 在node 使用子进程来运行脚本
export const run = async (command: string):Promise<void> => {
  // rf -rf
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(" ");
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: "inherit", // 直接将这个子进程的输出共享给父进程
      shell: true, // 默认情况下 linux才支持 rm -rf
    });
    app.on("close", resolve);
  });
};
export const pathRewriter = (format) => {
  return (id: string) => id.replaceAll('@o-plus', `o-plus/${format}`)
}
