+++
date = "2023-10-08"
draft = false
title = "AlembicCacheを使用したキャラクターアニメーション"
slug = "61a9e6c6980f2e80386ea89715403e2f"
tags = ["Maya", "UnrealEngine"]
useGitDate = false
+++

{{< figure src="nd2c71039dd4e_913d39087ce3f44e95512c1b75e379d2.png" alt="" >}}

Mayaでアニメーションを作成し、UnrealEngineでレンダリングする際に結構苦戦したので、その方法についてまとめておきます。Sequencerを使用した映像制作を主目的としています。

## 環境

- Maya2022
- UnrealEngine5.3

## なぜAlembicCache？

MayaとUnrealEngine(以下UE)間でファイルのやり取りをする際、よく使われるのはFBX形式になると思います。AlembicCache(以下ABC)を選択した理由は、単にFBXでやり取りする方法がわからなかったため。

使用したリグは、ジョイント/ブレンドシェイプ/デフォーマによって変形を行えるようになっていますが、FBXでは以下のような問題がありました。

- ブレンドシェイプはインポートできるけど、そのアニメーションはインポートできない
- デフォーマによる変形をインポートできない


{{< figure src="nd2c71039dd4e_1696739239687-4j0wkSMNRC.png" alt="" caption="Mayaで作成したアニメーションをUEでやり直し…？" >}}

ABCを使用すれば上記の問題が解決できます。しかし、これは自分が<strong>エクスポート/インポートの設定を間違えている </strong>もしくは<strong>リグの構造の問題</strong>の可能性もあります。実際、ジョイントなしで、ブレンドシェイプのみのアニメーションは問題なくインポートできて動かせることを確認しています。
デフォーマはおそらくサポートされていないので、UE上で再現できないのは仕方ないかもしれません。ジョイントやブレンドシェイプのみでデフォーマを再現できればいいですが、車輪の再発明みたいになっちゃいますね…。

ただ、FortinteではフェイシャルアニメーションについてはABCを使用しているようなので、FBXにこだわらなくても良いかなという結論に至りました。

[https://www.fxguide.com/fxfeatured/a-fortnite-at-epic/](https://www.fxguide.com/fxfeatured/a-fortnite-at-epic/)

自分が使用していて感じたABCのデメリットも後述しますが、機能を把握しきれいていない部分や検証が足りていないところもあるので、ご容赦を…

## 作業の流れ

主な作業の流れは以下の通り。

1. Mayaでアニメーション作成
2. ABCでエクスポートしてUEにインポート
3. Sequencerにアニメーションのトラックを追加

この記事では２と３についてまとめています。

## ABCをエクスポートする前に

事前にMaya上で準備しておくことは以下の２つ。
・マテリアルを面に割り当てる
・マテリアルの最後のノード(Shaderノード？)の名前をリネーム

MayaのマテリアルをそのままUEで使用できるわけではないので、やらなくても問題はありません。ただし、これをやっておかないと、以下の図のようにUEで再インポートする度にデフォルトのマテリアルが割り当てられ、UE側で用意したマテリアルを割り当て直す作業が発生してしまいます。


{{< figure src="nd2c71039dd4e_1696741209777-qlkz1NGiU7.png" alt="" >}}

### マテリアルを面に割り当てる

オブジェクトに対してではなく、面に割り当てておく必要があります。後述しますが、UEでABCをインポートする際、マテリアルを作成しながらインポートできます。そのとき参照されるのは、オブジェクトに割り当てられているマテリアルではなく、面に割り当てられているマテリアルになります。オブジェクトにしか割り当てられていない場合、マテリアルは作成されません。

### マテリアルの最後のノードの名前をリネーム


{{< figure src="nd2c71039dd4e_1696743496017-PydAbU4CX6.png" alt="" >}}

ABCインポート時に行われるマテリアルの作成と検索は、最後のノード(名前忘れましたが青いやつ)のノード名で行われます。よって、このノードを適切な名前に変更しておきましょう。(Maya上でのマテリアル名はその1つ前のノードで上図だとBody_ma)

## ABCをエクスポートする

[https://docs.unrealengine.com/5.3/en-US/alembic-file-importer-in-unreal-engine/](https://docs.unrealengine.com/5.3/en-US/alembic-file-importer-in-unreal-engine/)

難しいことはありません。ドキュメントにそって、エクスポートしましょう。
オプションのCache time range は基本的にはTimeSliderで問題ないとおもいます。これでMaya上で作成したアニメーションの最初から最後のフレームが出力されるようになります。最初と最後を変えたい場合は、Start/Endを選択し、フレームを指定してください。

ドキュメントにある通り、WriteFaceSetsを有効にする必要があります。これによって、先ほど面に設定したマテリアル情報がABCとして出力できるようになります。

## UEにインポートする前に

インポートする前に、UE側でプラグインが有効になっているかを確認します。Edit > Plugins でAlembicと検索し、「Alembic Importer」が有効になっていたら問題ありません。無効になっていたら有効にして、エディタの再起動を促されたら、それに従います。


{{< figure src="nd2c71039dd4e_1696745123801-pdeCytl8bI.png" alt="" >}}

## UEにインポートする

難しいことはありません。ドキュメントにそって、インポートしましょう。

設定項目が多くて戸惑うかもしれませんが、自分が使用した際はいくつかの項目のみ変更しただけで、ほとんどがデフォルトで問題ありませんでした。その際の項目についてもまとめておきます。

### TrackName一覧


{{< figure src="nd2c71039dd4e_1696745446107-J8nnNetSKq.png" alt="" >}}

正式名はわかりませんが、便宜上TrackName一覧ということで。Mayaで「Export All to Alembic」で出力した場合、オブジェクトがずらりと並ぶので、必要なものだけチェックを入れてインポートします。基本的にレンダリングするもののみインポートすれば問題ないはずです。NumFrameが1になっているものは、アニメーションしないオブジェクトなので、インポートする対象については想定通りの値になっているか確認してください。

ここで有効になっているオブジェクトがまるっと1つのAnimation Sequence
としてインポートされます。オブジェクトごとにインポートするよりもファイル数が減るので管理しやすくなるメリットはありますが、その分汎用性は落ちるので、臨機応変に使い分けるとよいと思います。

### Alembic > Import Type

Static Mesh, Geometry Cache, Skeletal の3種から選択できますが、アニメーションなのでSkeletalを選択します。Geometry Cacheでも問題ないかもしれませんが、こちらは未検証のため今回は触れません。

### Materials

初めてインポートする場合は「Create Materials」
を有効に。この時に作成されたマテリアルに対して、テクスチャやら計算やらを設定します。
事前にUE上でマテリアルを用意している場合は、「Find Materials」を有効に。また、ABCを再インポートする場合も「Find Materials」を有効に。

### Conversion


{{< figure src="nd2c71039dd4e_1696747202488-ssAOI7XWSs.png" alt="" >}}

・Scale はY軸を-1
・RotationはX軸を90
にすると、Maya上での見た目と同じになると思います。

## Sequencerに追加

Sequencer を開き、インポートによって作成されたAnimationSequenceをドラッグ&ドロップします。SkeletalMeshActorのトラックが追加されるので、もう一度同じAnimationSequenceをドラッグ&ドロップします。これにより、SkeletalMeshActorのトラックにアニメーションが追加されます。


{{< figure src="nd2c71039dd4e_1696748093466-wJnjOqpDWB.png" alt="" caption="2回目でAnimationが入っていることがわかる" >}}

これでMayaで作成したアニメーションをUEのSequencerで再生できるようになります。(便利！簡単！UE最高！！)

## コンストレイントでしか動かないオブジェクト

武器とか小物とかとか…コンストレイントでしか動かさないオブジェクトについては、インポート時にStartFrame/EndFrameが0, NumFrameが1となり、アニメーションとして正しくインポートできません。Geometry Cacheなら可能かもしれませんが(未検証)、少なくともSkeletalではそのような問題がおきます。
これはそのオブジェクトに対して、一つジョイントを用意してバインドし、そのABCをインポートすれば解決します。インポートのためとはいえ、アニメーションでは使わないデータが増えるので気持ち悪いですが、仕方ありません…。理由はわかりませんが、追加したジョイントに対して、キーを打つ必要はなかったりします…。

## Visibilityの切り替え

FBXではどうかわかりませんが、ABCではVisibilityの切り替えについてもひと手間必要になります。ABCのエクスポート設定に「WriteVisibility」がありますが、機能しなかったので、UEでサポートされていないのかもしれません。
これについては、Sequencer上で表示切替のキーを打つことで解決できます。

Visiblityを変更するオブジェクトについてはそれ専用のABCを用意します。既に全てまとめてエクスポートしたABCがある場合は、複製してファイル名を変え、それをインポートすれば良いでしょう。

UEにインポートし、先述のようにSequencerにAnimationSequenceを追加します。
追加したら、Actor Hidden In Game のトラックを追加します。


{{< figure src="nd2c71039dd4e_1696750028632-Peze6cZgqK.png" alt="" caption="Actor Hidden In Gameのトラックを追加する" >}}

これにより、Visibilityを切り替えるキーを打てるようになります。

## ABCの良いところ・良くないところ

使用してみて、個人的に感じた長所・短所についてもまとめておきます。ABC自体の長所・短所というより、この記事でのフローの長所・短所になっているかもしれません。

### 良いところ

何といっても扱い慣れたツールで作成したアニメーションをそのまま再現できることだと思います。FBXと比べると、表現の幅が広がるのかなと思います。
それに加えて、ショットを作成するのが楽だと思いました。一つのAnimationSequenceに複数のオブジェクトがまとまるので、Sequencerに1つドラッグ&ドロップするだけで、すぐに確認に移ることが可能です。

### 良くないところ

先述の通り、コンストレイントやVisiblityといった面倒なところがあるので、これはこちら側でどうにかできるならどうにかしたいですね。
また、この記事のようなフローだとショットごとに、ABCを作成することになります。モデルに変更があった場合、すべてのショットをエクスポート/インポートし直す必要が出る可能性があります。個人制作など小規模な作品なら何とかなるかもしれませんが、ショット数が増えるごとに苦しくなるやり方だとは思います。(ゲームのカットシーンにも向かないでしょう)

## 参考

[https://docs.unrealengine.com/5.3/en-US/alembic-file-importer-in-unreal-engine/](https://docs.unrealengine.com/5.3/en-US/alembic-file-importer-in-unreal-engine/)

[https://dev.epicgames.com/community/learning/tutorials/Db41/how-to-automatically-create-and-or-apply-materials-from-maya-to-alembic-meshes-on-import-to-unreal-engine](https://dev.epicgames.com/community/learning/tutorials/Db41/how-to-automatically-create-and-or-apply-materials-from-maya-to-alembic-meshes-on-import-to-unreal-engine)
