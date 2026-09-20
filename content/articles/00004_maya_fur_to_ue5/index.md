+++
date = "2023-07-02"
draft = false
title = "MAYAからUE5にデータを持っていく～Fur編～"
slug = "6ffa82c0cc8f2cd00dfd0160e6ed61e5"
tags = ["Maya", "UnrealEngine"]
+++

## MAYAでデータを作成する

- XGenを使って作成する方法が2通りほどある
- UE5に持っていくには Interactive Groom にする必要があるっぽいのでそれで作成する
- Mesh または Face を選択した状態で Create Interactive Groom Splines
- 専用のWorkspaceがあるのでそれに切り替えると作業しやすそう
- 親のShape属性のPrimitiveAttributes/Taperから先端の太さを変更できるっぽい
- base の Density Multiplier で毛量を変更できる
- スカルプトで好みの形状に調整し、AddModifier/noise で自然な外観にする
- Tool Settings から Collide with Meshes を有効にするとめり込まない
- 左右対称にする場合は同じくTool Settings の Symmetry Settings から

## UE5に持っていく

- こちらを参考に出力

[https://docs.unrealengine.com/5.0/ja/xgen-guidelines-for-hair-creation-in-unreal-engine/](https://docs.unrealengine.com/5.0/ja/xgen-guidelines-for-hair-creation-in-unreal-engine/)

- UE5側でプラグイン Alembic Groom Importer を有効にする
- 出力したAlembicファイルをインポート

追記
パラメータの設定やマテリアルについてはこちらの動画が参考になった

[https://youtu.be/niZhbcHgbIA](https://youtu.be/niZhbcHgbIA)
