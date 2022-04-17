import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";
import { ModuleKind, Project, ScriptTarget, SourceFile } from "ts-morph";
import { oRoot, outDir, projectRoot } from "./common/paths";
import { parallel, series } from "gulp";
import { run, withTaskName } from "./common";
import { buildConfig } from "./common/config";

const entryTypes = async () => {
  const files = await glob("*.ts", {
    cwd: oRoot,
    absolute: true,
    onlyFiles: true,
  });
  //   console.log("11111111111111111111111111111111111", files);
  const project = new Project({
    // 生成.d.ts配置
    compilerOptions: {
      declaration: true,
      module: ModuleKind.ESNext,
      allowJs: true,
      emitDeclarationOnly: true,
      noEmitOnError: false,
      outDir: path.resolve(outDir, "entry/types"),
      target: ScriptTarget.ESNext,
      rootDir: oRoot,
      strict: false,
    },
    skipFileDependencyResolution: true,
    tsConfigFilePath: path.resolve(projectRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  const sourceFiles: SourceFile[] = [];
  files.map((f) => {
    const sourceFile = project.addSourceFileAtPath(f);
    sourceFiles.push(sourceFile);
  });
  await project.emit({
    emitOnlyDtsFiles: true,
  });
  const tasks = sourceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput();
    emitOutput.getOutputFiles().forEach(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      await fs.writeFile(
        filepath,
        outputFile.getText().replaceAll("@o-plus", "."),
        "utf8"
      );
    });
  });
  await Promise.all(tasks);
};
/**
 * 复制entry类型
 * @returns 
 */
export const copyEntryTypes = () => {
  const src = path.resolve(outDir, "entry/types");
  const copy = (module) =>
    parallel(
      withTaskName(`copyEntryTypes:${module}`, () =>
        run(
          `cp -r ${src}/* ${path.resolve(
            outDir,
            buildConfig[module].output.path
          )}/`
        )
      )
    );
  return parallel(copy("esm"), copy("cjs"));
};
export const buildEntryTypes = series(entryTypes, copyEntryTypes());
