+++
date = "2026-09-14"
draft = true
title = "VEXをVSCodeで書きたい"
slug = "e90e0a37f70770fd4c5e6f1def248fba"
tags = ["Houdini"]
+++

{{< figure src="n8647c381d893_2cfa644f213cb273672aaf8e3fca5233.png" alt="" >}}

Houdiniを学び始めて、一番最初に躓いたところかもしれない.…
あまり実務的ではないかもしれないし、今後もっと良い方法に出会えそうな気もするが、ひとまずの妥協点として

## Attribute Wrangle

本を読んでいると、たびたびAttribute WrangleでVEXを記述する機会があった
VEXpressionにプログラムを記述するのだが、慣れていないこともあり、使いづらいと思ってしまった


{{< figure src="n8647c381d893_1789339964-9lBxkR1ipTDmy8njeSgah06z.png" alt="" >}}

補完やヘルプも出る点はとても良いのだが、枠小さかったりするし、()や""の閉じる方は自動で出てこないし.…慣れているエディタでコードを書きたくなる


{{< figure src="n8647c381d893_1789340390-9itZcMOSsPeU70hIHwvCYQ2r.png" alt="" caption="入力補完" >}}



{{< figure src="n8647c381d893_1789340421-jBmzly5GrMHuI0FgEOQSR3UC.png" alt="" caption="どういう関数か引数の情報などを見ることができる" >}}

一応VEXpression内でCtrl + Eでエディタを開くこともできる…アプリケーションを切り替えるのが面倒なら、これでもいいかもしれない


{{< figure src="n8647c381d893_1789341908-CNdh1ZGVtg7cUQmTM8ne5BLu.png" alt="" >}}

## External Editor

調べてみたらすぐに出てきた
おなじみインディゾーンさんのブログ
Houdini22でも、記事の通りに設定・環境変数ファイルを用意することで、VSCodeでVEXを書けるようになった
めでたし、めでたし

[https://houdinifx.jp/blog/visual-studio-code%E3%81%AA%E3%81%A9%E3%81%AE%E5%A4%96%E9%83%A8%E3%82%A8%E3%83%87%E3%82%A3%E3%82%BF%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B/](https://houdinifx.jp/blog/visual-studio-code%E3%81%AA%E3%81%A9%E3%81%AE%E5%A4%96%E9%83%A8%E3%82%A8%E3%83%87%E3%82%A3%E3%82%BF%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B/)

…思ってたのと違う

### エディタを開く、閉じる

Ctrl + E でVSCodeが開くので、そのまま記述する
そして保存するまでは良いのだが、その後Houdiniに戻っても、「応答なし」

保存したらVSCodeを閉じる必要があった
ちょっとした処理を記述し、その後修正することもないなら、これでも良いかもしれない
しかし、変更を繰り返すなら、コードエディタを開いて、閉じてを行う必要があるため、イテレーション効率が悪い

### tmpファイル？

VSCodeで編集する際、以下のようにファイル名を確認することができる
そして、再度編集する際にファイル名を確認すると、別の名前に代わっているのである


{{< figure src="n8647c381d893_1789394451-WFx8JkTQbqz0Cfv6BsgjSOKn.png" alt="" caption="最初に開いたとき" >}}


{{< figure src="n8647c381d893_1789394808-NAXndBrlxOHy45uahDw3KFJ7.png" alt="" caption="次に開いたとき" >}}

つまりここで開いているファイルは、あくまでVEX編集のためだけの一時ファイルで、少なくともAttribute WrangleのVEXpressionはあくまで「値」としか扱っていないように見える

VEXをプログラムとして見ている以上、外部ファイルに逃がしたり、バージョン管理するなりして再利用性を高めたくなるので、この方法も自分とは相性が悪いように思える
ごにょごにょ試行錯誤しているうちに、任意のファイルを読み込ませるようなことができた気がするけど、面倒だったし気のせいだったかもしれない…
そもそもあまり使いまわすようなものではないのだろうか…🤔

## 本題

とはいえHoudiniで記述するのはしんどくなってきたので、AIに助けを求めた
以下はあくまでAttribute Wrangleを使用する場合の例

### ファイルを作成する

VEXを編集するファイルの拡張子を「vfl」にし、任意の名前で作成する
ただし、場所は<strong>vex / include</strong>ディレクトリに置く必要がある
そして、vex/includeディレクトリは、以下のいずれかの場所に置く

①VEXを使用するhipファイルと同じ階層


```text
MyProject/
├─ scene.hip
└─ vex/
   └─ include/
      └─ foo.vfl
```

②Documents / houdini[バージョン] 　(標準で作成されるフォルダ)


```text
Documents/
└─ houdini[version]/
   └─ vex/
      └─ include/
         └─ foo.vfl
```

③環境変数を設定するなら任意の場所


```text
D:/
└─ MyHoudiniLib/
   └─ vex/
      └─ include/
         └─ foo.vfl
```

手軽に使いまわすなら、②が良さそうではある
ジャンクションを設定するなどすれば、vfl本体はどこでも良かったりもする

### 関数を定義

ファイルを作成したら、そこにコードを書く
以下は各ポイントに対して、ColorDiffuseアトリビュートに赤(1, 0, 0)を設定する例
関数を定義して、その中に処理を記述する必要がある


```text
void change_color(int ptnum) {
    setattrib(0, "point", "Cd", ptnum, 0, set(1, 0, 0));
}
```

setattribについてはこちら

[https://www.sidefx.com/ja/docs/houdini/vex/functions/setattrib.html](https://www.sidefx.com/ja/docs/houdini/vex/functions/setattrib.html)

### AttributeWrangleで呼び出す

VEXpression内に以下のように記述


```text
#include "sample.vfl"
change_color(@ptnum);
```

作成したファイルを読み込み、そのファイル内に定義している関数を呼び出す
そしてその関数にはptnumを渡す
少し手間はあるものの、こうすることで基本的には処理内容はHoudini上で変更せず、VSCodeのみで編集できるようになる
とはいえ、自動更新されるわけではないので、Houdini側でちょっと手を加えるなど手動で更新が必要(なんとかしたい…)

得られる結果は次の通り


{{< figure src="n8647c381d893_1789487013-5gVcRdFEHq7lOQXUPZBKk3he.png" alt="" >}}

### アトリビュートを渡して加工するとき

### アトリビュートを渡したいけど、値は変えたくないとき

### アトリビュートを複数渡したいとき

### ch() を使いたいとき
