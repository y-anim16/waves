+++
date = "2024-03-26"
draft = false
title = "Blender用アドオン QuikSnapを使う"
slug = "aa19c82e47d3dd06d48081ae346dfc25"
tags = ["Blender"]
+++

標準のスナップ機能が自分には扱いづらく感じたため、「QuickSnap」というAddonを使ってみる。
少々戸惑ったため、使い方を簡単にまとめる。

## 環境

- Blender 4.0
- アドオン QuikSnap 1.4.5

QuikSnap は以下からダウンロード可能

- BlenderMarket

[https://blendermarket.com/products/quicksnap](https://blendermarket.com/products/quicksnap)

- GitHub

[https://github.com/JulienHeijmans/quicksnap](https://github.com/JulienHeijmans/quicksnap)

## 基本的な使用方法

### Object Mode

1. <strong>「shift + ctrl + v」</strong>で機能を有効に
2. 任意の頂点を選択(オブジェクトを選択した状態で手順1を行った場合は、そのオブジェクトの任意の頂点のみ)
3. <strong>「1」</strong>,<strong>「2」</strong>,<strong>「3」</strong>で選択する対象を頂点, 辺, 面のいずれかに変更できる
4. 選択したらドラッグに合わせてオブジェクトが移動するので、スナップさせたい頂点を選択すると、最初に選択した頂点(または辺、面)がその位置に移動するようにオブジェクトが置かれる(このとき、手順3の操作を行えば、スナップ先についても頂点, 辺, 面のいずれかに変更できる)
5. ドラッグ中にX,Y,Zのいずれかを選択すれば、その軸のみでの移動にできる

### Edit Mode

使い方はObjectModeとほとんど同じ
選択対象に依存せず、スナップさせたい対象を変更できる

例:
頂点選択モードでも、機能を有効にして、「2」や「3」の入力で、辺や面をスナップ対象として選択できるようになる

自身の頂点などにもスナップさせることが可能で、頂点の場合は設定を有効にしておけば自動マージも可能
