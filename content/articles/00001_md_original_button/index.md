+++
date = "2022-12-27"
draft = false
title = "自作したボタンを使用する"
slug = "d76f6a5693fb65fb38a746a4129eca44"
tags = ["MarvelousDesigner"]
+++

デフォルトで用意されているボタンではなく、自作したボタンを使用したかったのですが、それをするのに手こずったので備忘録としてまとめます

## 環境

Marvelous Designer 12
Blender 3.3

## ボタンを用意する

まずはBlenderで、使用するためのボタンを用意します。
とりあえずボタンの形状は何でもよいので、今回は以下のようにします。


{{< figure src="nb0817c40d124_1672068618969-VWvZj4w2ws.png" alt="" >}}

OBJ形式でエクスポートします。MarvelousDesigner側でサムネイルの設定をする必要があるので、キャプチャも用意しておきます。


{{< figure src="nb0817c40d124_1672068809335-82iPJ4IbE4.png" alt="" >}}

## ボタンを使用する

MarvelousDesignerで、作成したボタンを使用できるようにします。
メニューバーの「Materials」>「Button」>「Register Button」からボタンを登録するためのウインドウを開きます。


{{< figure src="nb0817c40d124_1672069211262-axoFammUAn.png" alt="" >}}

各項目を任意の設定に変更します。
「Thumbnail」はボタンを用意した際に合わせて作成したキャプチャを設定します。十字が描かれている四角形をクリックするとファイル選択ダイアログが開きます。
「OBJ」は作成したボタンのファイルを指定します。右端の「田」のようなアイコンからファイルを選択します。


{{< figure src="nb0817c40d124_1672069924596-4uJzdZwrvk.png" alt="" >}}

これにより、btnファイルが作成され、Libraryの「Hardware_and_Trims」>「Button & Buttonhole」> 「Button」で確認できるようになります。


{{< figure src="nb0817c40d124_1672070392082-WmLPrpIZyq.png" alt="" >}}

Buttonウインドウを開き、「Add」から新しいボタンを作成します。

作成したら、PropertyEditorで設定を行います。「Shape」の「▼」から先ほど登録したボタンを選択します。「＋」からは登録用のウインドウが開きます。


{{< figure src="nb0817c40d124_1672070644124-aH9zi3ezmi.png" alt="" >}}

以上で、ボタンとして使用できるようになりました。もし想定と異なるボタンが生成されてしまう場合は、Buttonウインドウで、追加したボタンを選択していない状態になっているかもしれません。


{{< figure src="nb0817c40d124_1672071652174-ad8qkkrmA3.png" alt="" >}}

また、生成したボタンを選択すると、PropertyEditorの「Style」から形状を変更することも可能です。


{{< figure src="nb0817c40d124_1672071788590-PydYElsAs2.png" alt="" >}}

## 参考

[https://marvelousdesigner.zendesk.com/hc/en-us/articles/360037396831-ADD-CUSTOM-BUTTON-AND-BUTTONHOLE-Register-Custom-OBJ-as-Button](https://marvelousdesigner.zendesk.com/hc/en-us/articles/360037396831-ADD-CUSTOM-BUTTON-AND-BUTTONHOLE-Register-Custom-OBJ-as-Button)
