+++
date = "2024-03-17"
draft = false
title = "Blenderでアニメーションを作るときのメモ"
slug = "f14237136c1083f7b421d02b745ce5b7"
tags = ["Blender"]
useGitDate = false
+++

随時更新

## リグを参照したい

直接リグに触るのではなく、リグとアニメーションのファイルを分けたいときに。

1. リグが含まれるファイルと任意のファイルを用意(リグはCollectionを作成しておく)
2. 任意のファイルを開き、メニューから「File」>「Link」を選択
3. リグのファイルを選択し、Collectionを開く
4. シーンに追加される(この時点ではObjectModeとしてしか扱えない)
5. Collectionを選択して右クリックで「Library Override」> 「Make」>「Selected & Content」でPoseModeに変更できるようになり、アニメーションを付けられる。

LinkはMayaのReference機能に似たもので、アニメーション作成以外でも有用。

<strong>参考</strong>

[https://www.youtube.com/shorts/yjmbWFnmyaw](https://www.youtube.com/shorts/yjmbWFnmyaw)

## ポーズをリセットしたい

リセットしたい任意のコントローラを選択して、以下のキー入力で値をリセットできる。

<strong>Alt ＋ G : 移動
Alt ＋ R : 回転
Alt ＋ S : スケール</strong>

## フレームレートを変更したい

出力設定から変更できる


{{< figure src="n08f6e526abb2_1710725614642-I0F9jHxpVx.png" alt="" >}}

## 3DView空間上にリファレンスを置きたい

Addメニューから、
<strong>「Empty」>「Image」
「Image」>「Reference」
「Image」>「Background」</strong>
のいずれかで、画像ファイルを設定できる板を作成できる

作成したらDataプロパティから動画ファイルを設定する。これにより、再生した際に動画も再生されるようになる。

途中で動画が停止する場合は、Dataプロパティの「Frames」の値を更新する。これは再生するフレーム数なので、動画のフレーム数に合わせて変更する。最初から最後まで再生するなら、右横にある更新ボタンを押せば自動で総フレーム数が入るはず。

## ポーズライブラリを使用する

作業効率を上げるために、よく使うポーズは使いまわせるようにしておきたい。Blenderには標準でPoseLibraryのアドオンが入っているので、基本的にはそれを使えば問題ないはず。

### ポーズライブラリの作成手順

1. ポーズを作成するファイルを用意する(リグのファイルでも良さそう)
2. 手順1のファイルで任意のポーズを作成
3. <strong>「DopeSheet」>「ActionEditor」</strong>を開き、<strong>「Create Pose Asset」</strong>(このとき、ポーズとして登録したいコントローラを選択しておく)
4. <strong>AssetBrowser</strong>上でポーズアセットとして確認できるようになる

ポーズを変更して、AssetBrowserから任意のアセットをダブルクリックすれば、そのポーズに切り替わることが確認できる。

### ポーズライブラリを別のファイルで使用するには

上記手順で作成したポーズアセットは何か別のファイルとして保存されるわけではなく、アセットを作成したblendファイルに含まれる。
そのため、そのままでは別のファイルから使用することはできないので、別のファイル側で、そのアセットを参照できるようにする必要がある。

以下はその設定手順

1. ポーズを作成したblendファイルを任意の場所に置く
2. <strong>「Preference」>「File Paths」>「Asset Libraries」</strong>で1のフォルダパスを設定する
3. 別のファイルからも<strong>AssetBrowser</strong>から作成したポーズを確認できるようになる

<strong>Toggle Asset Shelf </strong>をクリックすれば、3Dビューポート上に専用のパネルが表示されるので、AssetBrowserを開かなくても良い


{{< figure src="n08f6e526abb2_1710734077508-yfxg0n3NKS.png" alt="" >}}

<strong>参考</strong>

[https://docs.blender.org/manual/ja/4.0/animation/armatures/posing/editing/pose_library.html](https://docs.blender.org/manual/ja/4.0/animation/armatures/posing/editing/pose_library.html)

## コントローラとかリファレンスとか非表示にしたい

<strong>「alt」+「shift」+「z」</strong>

アニメーションをView上で確認したいけど、コントローラなどが邪魔なときに。
もう一度入力すれば、元通りに表示できる。
