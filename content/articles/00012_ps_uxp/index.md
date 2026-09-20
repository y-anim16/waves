+++
date = "2025-03-09"
draft = false
title = "UXPを触ってみる"
slug = "bf11b2944b27db7a489f0604a5a7d9b0"
tags = ["Photoshop"]
+++

今日では、PhotoshopなどのAdobeソフトのプラグイン開発は、UXPで行うのが良さそうなので触ってみます。

Adobe公式のクイックスタートガイドに沿って進めます。

[https://developer.adobe.com/photoshop/uxp/2022/guides/](https://developer.adobe.com/photoshop/uxp/2022/guides/)

## 導入

Creative Cloud Desktop から、<strong>UXP Developer Tools</strong> をインストールします。


{{< figure src="na2072f695d7a_1741517733-XdgnkPsF603JLIMtfBKlNySv.png" alt="" >}}

インストールしたら開発ツールが起動します。


{{< figure src="na2072f695d7a_1741518349-soOCnBMvwzNxP2gi47fS0cYI.png" alt="" >}}

プラグイン作成を選んで、各項目を入力。今回は、「quick-layers-starter」をテンプレートとして作成します。


{{< figure src="na2072f695d7a_1741524978-s0MWOeDjrElvI3uzXQpf9tJb.png" alt="" >}}

フォルダを選択したら、ファイル一式がそこに作成されます。

## Photoshopでプラグインを実行してみる

Photoshop を起動して、Preferencesから開発者モードを有効化し、再起動します。


{{< figure src="na2072f695d7a_1741526444-mbCztr7MTGYIEkhiKAcL01pJ.png" alt="" >}}

Developer Toolsに戻り、作成したプラグインの「Load」から実行します。


{{< figure src="na2072f695d7a_1741527006-px2vcstHIfbPU8YG4LFyK5zW.png" alt="" >}}

Photoshop上でこのようなパネルが表示されます。


{{< figure src="na2072f695d7a_1741527087-09htNDaGgTqIHJLvSMZEwA3Y.png" alt="" >}}

## 思ったこと

開発において、コードエディタ、UXP Developer Tools、Photoshopと最低3つのアプリを行き来する必要があるのは、面倒に感じました。VSCodeからコマンド実行などでどうにかしたいところ。

※追記
UXP Developer Tools　で「Load」した後に「Watch」または「Load & Watch
」で、スクリプトの更新がすぐ反映されました。一度「Watch」にすれば、更新についてはUXP Developer Toolsを見に行かなくても良さそうです。
