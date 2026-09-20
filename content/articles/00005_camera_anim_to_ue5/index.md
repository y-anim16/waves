+++
date = "2023-09-12"
draft = false
title = "カメラリグのアニメーションをUE5に持っていく"
slug = "e97e6a64f330646ea41badb3affe7e16"
tags = ["Maya", "UnrealEngine"]
useGitDate = false
+++

## 環境

Maya2022
UnrealEngine 5.0.3

Maya上で作成したカメラのアニメーションをUEに持っていく方法は以下の記事通り。

[https://note.com/yuk_cg16/n/n66f75aa0d8e0](https://note.com/yuk_cg16/n/n66f75aa0d8e0)

ただし、実際にアニメーションを作るとなると、カメラに直接キーを打つよりは、カメラリグを使用する方が作成しやすいのではないかと思います。

カメラリグを使用すると、コントローラにキーフレームを打つことになり、カメラ自体にはキーが打たれていないことになります。(カメラのアトリビュートはリグによるかもしれませんが)
よって、そのままFBXとして出力してUEにインポートしても、カメラが動いてくれません。
そのため、Maya上で出力するための準備をする必要があります。(出力設定でどうにかなるなら教えてください…)

## で、どうするの





{{< figure src="n51d4c83a51cb_picture_pc_144cb2fa7890708ab0eb745e6f9d3bde.gif" alt="" >}}

カメラの移動,回転,焦点距離を変更したアニメーションを作成しました。移動と回転はコントローラーに、焦点距離はカメラにキーが打ってある状態です。

まず、リグのカメラを複製します。ただし、焦点距離のアニメーションも一緒に複製されてほしいので、<strong>Duplicate Special </strong>で複製します。
オプションから、<strong>Duplicate input graph</strong> を有効にして複製します。


{{< figure src="n51d4c83a51cb_1694527963840-HcFhbAY7WU.png" alt="" >}}

次に、複製したカメラを、焦点距離のアニメーションのみついた状態にします。(この工程はもしかしたら不要かもしれません)
親子関係を切り離し、コンストレイントが付いていたら削除します。

次に、元のカメラと複製したカメラを、ペアレントコンストレイントで紐づけてやります。複製したカメラは、元のカメラと全く同じ動きをしてほしいので、オプションで<strong>Maintain offsetを無効にします。</strong>

最後に、複製したカメラを選択し、<strong>Bake simulation </strong>で移動と回転のキーをベイクしてやります。

以上で準備が完了したので、カメラアニメーションとしてFBXを出力し、UE上でインポートしてやれば、同じアニメーションが再現されるはずです。(記事内の画像は被写界深度を調整しています)



{{< figure src="n51d4c83a51cb_picture_pc_c32d3e7790df3b832b0d2fc41bce4811.gif" alt="" caption="UnrealEngine" >}}


{{< figure src="n51d4c83a51cb_picture_pc_5321e4f6506a81fff65326a4fbe27075.gif" alt="" caption="Maya" >}}

やることが決まっているので、スクリプトを書いてシェルフに追加してもいいかもしれませんね

## 参考元

[https://www.youtube.com/watch?v=VyhxDDmJH0Y](https://www.youtube.com/watch?v=VyhxDDmJH0Y)
