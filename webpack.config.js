// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require("path");
// const enabledSourceMap = MODE === "development";

module.exports = {
  //ファイルの監視
  watch: true,
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: "development",
  // エントリーポイントの設定
  entry: "./src/js/app.js",
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: "bundle.js",
    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.join(__dirname, "public/assets/js/")
  },
  devServer: {
    inline: true, //ライブリロード有効
    open: true, //ブラウザを自動で開く
    //openPage: "index.html", //自動で指定したページを開くhttp://192.168.1.96:3000/index.html
    contentBase: path.join(__dirname, "public"), // HTML等コンテンツのルートディレクトリ
    publicPath: "/assets/js", //バンドルされたファイルの場所
    watchContentBase: true, //コンテンツの変更監視をする
    port: 3000, // ポート番号
    host: "0.0.0.0", //0.0.0.0にしないとローカルIPアドレスで開けない
    useLocalIp: true //ローカルIPアドレスで開く
  },
  //ローダーの設定
  module: {
    rules: [
      {
        // ローダーの処理対象ファイル
        test: /\.js$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: "babel-loader",
            // ローダーのオプション
            // 今回はbabel-loaderを利用しているため
            // babelのオプションを指定しているという認識で問題ない
            options: {
              presets: [["@babel/preset-env", { modules: false }]]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              // ソースマップの利用有無
              sourceMap: true,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2
            }
          },
          // PostCSSのための設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              plugins: [
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              // ソースマップの利用有無
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
