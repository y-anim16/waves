+++
date = "2023-07-02"
draft = false
title = "MAYAからUE5にデータを持っていく"
slug = "757d6dc4946afdc563a9437df4bca383"
tags = ["Maya", "UnrealEngine"]
useGitDate = false
+++

自分用メモ

## カメラ

- Animation と Camera にチェックを入れた状態でFBXで書き出し
- インポートはSequencer上で行う
- Level SequenceにCameraを追加
- 追加したカメラを選択して、右クリックメニューからImport
- 出力したFBXを選択
- Mayaで作成したカメラアニメーションが読み込まれる

※ Match by Name Only の仕様がよくわからなかった。無効にすればインポートはできる。

## アニメーション

- カメラと同じようにエクスポート
- SmoothMesh と Animation にチェックを入れればよさそう
- モデルをリファレンスとしてシーンに配置している場合は、Referenced Assets Content にもチェックを入れる
- 29.97fps で出力したアニメーションはUE側でインポートできない？ので30fpsで作成して出力する
