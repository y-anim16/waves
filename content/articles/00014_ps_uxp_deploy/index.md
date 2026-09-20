+++
date = "2025-03-23"
draft = false
title = "UXPプラグインを配布する方法"
slug = "658f7528bc6fb683f5cc296001251a88"
tags = ["Photoshop"]
+++

## パッケージ化する

作成したプラグインを配布するのであれば、まずパッケージ化する。

手順は簡単で、 UXP Developer Tool から、「<strong>Package</strong>」ボタンを押して、保存先を選択するだけ。(下記リンク先を参考)

[https://developer.adobe.com/photoshop/uxp/2022/guides/distribution/packaging-your-plugin/](https://developer.adobe.com/photoshop/uxp/2022/guides/distribution/packaging-your-plugin/)

パッケージ化が成功すると、.ccxファイルが作成される。これをダブルクリックで開くと、Creative Cloud が開き、以下のような確認が求められるので、「Install」をクリックすれば、インストールされることを確認できる。


{{< figure src="n1a244f811118_1742718092-NQU0euWMSp7Fk4hfVAowtIiq.png" alt="" >}}

※プラグインを更新した場合、<strong>manifest.json </strong>の「<strong>version</strong>」の値も更新してからパッケージ化しないと、再インストールしても反映されないっぽい。

## 配布する

配布方法は2通りある。

[https://developer.adobe.com/photoshop/uxp/2022/guides/distribution/distribution-options/](https://developer.adobe.com/photoshop/uxp/2022/guides/distribution/distribution-options/)

### マーケットプレイスで配布

不特定多数に公開するならこちら

### .ccxファイルを渡す

組織内で運用するのであれば、.ccxファイルを共有すればよさそう。ただし、使用者が各々でインストールする必要がある。

## インストールを自動化するには

<strong>Unified Plugin Installer Agent</strong> から、コマンドを実行してインストールする仕組みを作ると良さそう。

コマンドラインからの作業
[https://helpx.adobe.com/jp/creative-cloud/help/working-from-the-command-line.html](https://helpx.adobe.com/jp/creative-cloud/help/working-from-the-command-line.html)

先述の通り、.ccxファイルを開くと、Creative Cloudが開き、インストールの確認が求められる。複数のプラグインを組織で運用することを想定すると、各々でインストールしてもらうのは、手間な上に、統一性が保てない恐れがある。

Unified Plugin Installer Agentは、コマンドを実行すれば、<strong>Creative Cloud上での確認は求められず、インストールを完了できる。</strong>

以下はコマンドによるインストールをbatchファイルから実行できるようにした例


```text
@echo off

set CURRENT_PATH=%cd%
cd "..\uxp.sample\package"

set PACKAGE_FILE=uxp.sample.ccx
set CCX_FILE=%cd%\%PACKAGE_FILE%

cd %CURRENT_PATH%

"C:\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent\UnifiedPluginInstallerAgent.exe" /install "%CCX_FILE%"
```

バージョン管理システムを通じてパッケージを共有している場合、このbatchファイルを、Gitフックのpost-mergeなどで自動実行する仕組みを用意すれば、プラグインのインストールも自動化できるはず。
