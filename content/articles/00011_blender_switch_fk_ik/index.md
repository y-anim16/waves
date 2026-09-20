+++
date = "2024-04-15"
draft = false
title = "BlenderでFKとIKを切り替え可能なリグを組む"
slug = "e932b64abc1db059a2c9af30cec21ff1"
tags = ["Blender"]
+++

一例として組み方をまとめておく

### 下準備

1. ２つからなるボーンを作成する(IKで曲がる方向が決まるように、若干回転させておく)

このボーンでメッシュを変形させることになる


{{< figure src="nbc9c973d7d13_1713147144740-EGdZow4A58.png" alt="" >}}

2.  FK用とIK用にボーンを複製する(ここで複製したボーンの回転情報などを手順1で作成したボーンに反映させることで、FK/IKの切り替えを実現する)


{{< figure src="nbc9c973d7d13_1713147274931-GXJW39gy3Z.png" alt="" caption="画像はわかりやすくするために回転させた状態" >}}

### IKを組む

1. IKハンドル及びポールターゲットとして扱うボーンをそれぞれ作成する

カーブやメッシュで作成すると、Poseモードで制御できなくなり、扱いづらくなるので、IKのコントローラとして扱うためのボーンになる(見た目は後から変更可能)


{{< figure src="nbc9c973d7d13_1713147919135-ktZpo04uvY.png" alt="" >}}

2. Poseモードに入り、先端のIKボーンに対して、BoneConstraintプロパティから、InverseKinematicsを追加する
TargetとPoleTargetに、前の手順で作成したボーンを設定する

必要に応じて、PoleAngleの値を変更するが、何にすればいいかドキュメントを見てもよくわからなかった(今回の例では180度でIK適用前と同じ見た目になった)
ChainLengthはIkで動かすボーンの数に変更する


{{< figure src="nbc9c973d7d13_1713148517082-FOXVAgd3Eo.png" alt="" >}}

### FKとIKの切り替えの実装

1. メッシュを変形させるボーンそれぞれに対して、BoneConstraintプロパティから、CopyRotationを追加し、FK用ボーンとIK用ボーンを設定する

Influenceの値を0/1に切り替えることで、FKとIKを切り替えられるようにする


{{< figure src="nbc9c973d7d13_1713163202469-oiZhQbqKqL.png" alt="" >}}

2. FK/IKの切り替え用のボーンを作成する
これは作らずに、Rootボーンなど扱いやすいボーンでも代用可

3. Poseモードに変更し、FK/IK切り替え用ボーンに対して、CustomPropertyを追加する
Editモードで追加すると、Poseモードでキーを打てなくなるので注意！


{{< figure src="nbc9c973d7d13_1713164783165-64tkZMYlAO.png" alt="" caption="ここではUseIkという名前に設定" >}}


{{< figure src="nbc9c973d7d13_1713164934131-kKwHVchwsm.png" alt="" >}}

設定すると、ボーン選択時にViewport右のPropertiesにも現れる

4. ドライバーを設定する
作成したカスタムプロパティの上で右クリックして、Copy as New Driver


{{< figure src="nbc9c973d7d13_1713167129814-n0IM0rYK8r.png" alt="" >}}

5. IK用のCopyRotationのInfluenceに対して、右クリックでPasteDriver

これにより、手順3で作成したCustomPropertyの値が1のとき、IKが有効になる


{{< figure src="nbc9c973d7d13_1713167427229-TRyTDccrd2.png" alt="" >}}

6. FK用のCopyRotationのInfluenceに対しても同様に、右クリックでPasteDriver
ただし、FKはIKが無効ならInfluenceが1,IKが有効なら0になるように設定する

ペーストしたら右クリックでEdit Driverで設定を変更する
TypeをScripted Expressionに変更
Expressionを「<strong>1 - UseIK</strong>」に変更する
これにより、UseIKの値が変わったときに、この計算が行われ、その計算結果の値がInfluenceの値になる


{{< figure src="nbc9c973d7d13_1713168016264-9niQX7yQ1k.png" alt="" >}}

7. 変形用ボーンすべてに同様の設定を行ったら完成

BoneプロパティからCustomShapeを設定することで、Boneの見た目を変更できる
また、Hide に対してもDriverを設定すれば、FK/IKの切り替えで、対象のボーンの表示/非表示も切り替えられる


{{< figure src="nbc9c973d7d13_1713169458352-sRxkFEtr2E.png" alt="" >}}

### 参考

[https://www.youtube.com/watch?v=ZA9eCRJfAqo](https://www.youtube.com/watch?v=ZA9eCRJfAqo)




[https://www.youtube.com/watch?v=xEnu_EsnzjI](https://www.youtube.com/watch?v=xEnu_EsnzjI)
