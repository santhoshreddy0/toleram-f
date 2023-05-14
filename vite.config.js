import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import { resolve } from "path";
import fs from "fs/promises";

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [
            splitVendorChunkPlugin(),
        ],
        define: {
            '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
        },
        resolve: {
            alias: {
                src: resolve(__dirname, "src"),
            },
        },
        build: {
            outDir: resolve(__dirname, "build"),
            commonjsOptions: {
                include: [/linked-dep/, /node_modules/],
                transformMixedEsModules: true,
            },
            sourcemap: true
        },
        esbuild: {
            loader: "jsx",
            include: /src\/.*\.jsx?$/,
            exclude: [],
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [
                    {
                        name: "load-js-files-as-jsx",
                        setup(build) {
                            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                                loader: "jsx",
                                contents: await fs.readFile(args.path, "utf8"),
                            }));
                        },
                    },
                ],
            },
        },
    })
}
