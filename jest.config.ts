import nextJest from "next/jest";
import { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const CONFIG: Config = {
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(CONFIG);
