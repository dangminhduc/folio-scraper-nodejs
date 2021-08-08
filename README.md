# folio-scraper-nodejs

## 概念
https://folio-sec.com/theme/<テーマ名>というURLになっているが そのテーマ名を入力として受け取り指定したテーマの銘柄一覧を見れるようにするサーバーアプリケーション

## 環境構築方法

### 必要なツール

```
Docker
```

### イメージビルド
```bash
$ docker build -t folio-scraper:latest ./
```

### アプリケーション起動

```bash
$ docker run -dp 3000:3000 folio-scraper:latest
```
アプリがlocalhostポート3000番で動いています。

### アプリケーションを動かす方法

クライアントを使って（curl, Postman, ブラウザーなど)テーマ名パラメターとしてアプッリケーションへアクセスします。

```bash
$ curl localhost:3000/<テーマ名>
```
例えば

```
$ curl localhost:3000/cosplay
{"result":["キヤノン","ドウシシャ","東映アニメーション","コニシ","バンダイナムコＨＬＤＧ","スクウェア・エニックスＨＬＤＧ","パン・パシフィック・インターナ","セリア","パソナグループ","サンリオ"]}
```
結果はjsonの形式で返ってきます。
