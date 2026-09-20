+++
date = "2024-04-11"
draft = false
title = "Blenderでリギングを行うときのメモ"
slug = "8835deb813c66a53f34b3266b310bdff"
tags = ["Blender"]
+++

## コントローラでボーンを動かす

Boneプロパティから任意のオブジェクトを設定してやれば、ボーンをコントローラで制御できるようになる。

### 手順

1. コントローラとして使うメッシュを用意する
2. ArmatureのPoseモードで任意のボーンを選択
3. 選択したボーンのBoneプロパティから「ViewportDisplay」>「CustomObject」で作成したメッシュを選択
4. Scale,Translation,Rotationを任意の値に設定し、ワイヤーフレーム表示で扱いたい場合は、チェックボックス「Wireframe」を有効にする

## コントローラの色を変える

上記手順で設定したコントローラの色は、ボーンの色を参照する。そのため、コントローラの色を変えるには、ボーンの色を変えれば良い。

### 手順

1. ArmatureのEditモードで任意のボーンを選択
2. 選択したボーンのBoneプロパティから「ViewportDisplay」>「BoneColor」を任意の色に変更
