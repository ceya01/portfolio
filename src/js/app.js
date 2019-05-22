

import $ from 'jquery';
import _ from 'lodash';
import Popper from 'popper.js';
import BootStrap from 'bootstrap';
import Vue from 'vue';
import ClickOutside from 'vue-click-outside';

console.log('start');

const SKILL_DATA = {
  default:{
    title: 'スキル紹介',
    desc: '左のゲージをクリックして詳細を表示します。<br><br>数値の目安▼<br>30%：研修完了～実務開始レベル<br>50%：実務1年相当<br>70%：実務3年相当'
  },
  html:{
    title: 'html&CSS',
    desc: 'シンプルな構成のページを作成できます。<br>BootStrap,Sass,CSS設計（FLOCSS）も使用できます。'
  },
  js:{
    title: 'javaScript',
    desc: '簡単なアプリの作成ができます。<br>jQuery,Vueも扱えます。<br>npm/yarnを使ったパッケージ管理や、gulpを使った自動ビルド・ブラウザ確認ができる環境を構築して開発ができます。'
  },
  php:{
    title: 'PHP&MySQL',
    desc: 'ユーザー登録/ログイン/webサービスの基本的なサーバーサイドの機能は実装できます。<br>フレームワークは勉強中です。'
  },
  git:{
    title: 'git',
    desc: 'バージョン管理の概念と基礎的なコマンドは理解しています。個人使用のみですがファイル履歴管理として使用しています。githubにもソースコードをアップしています。'
  },
  wp:{
    title: 'WordPress',
    desc: 'テーマのカスタマイズや機能追加など、一通りのことはできます。<br>DBの構造やフック、アクションなどの仕様も理解しています。自分のサイト運営や、知り合いに依頼されてカスタマイズ業務の経験があります。'
  },
  design:{
    title: 'webデザイン',
    desc: 'Adobe XD, Photoshop を扱えます。<br>デザインの基礎的な知識はあります。<br>シンプルなデザインであれば作成できます。'
  },
  video:{
    title: '動画編集/アニメーション制作',
    desc: 'Animate(Flash), After Effects を扱えます。<br>趣味で動画制作をしていたこともあり、アルバイトでの業務経験あります。'
  },
  seo:{
    title: 'SEO/webサイト運営',
    desc: 'アドセンス/アフィリエイト収益を目的としたWordpressサイト運営の経験があります。<br>クラウドソーシングで記事を外注した経験もあります。<br>最大で月80万円ほどの収益を上げられていた時期もありました。'
  },
}

let appSkills = new Vue({
  el: '#appSkills',
  data:{
    title:SKILL_DATA.default.title,
    desc:SKILL_DATA.default.desc
  },
  methods:{
    showDesc: function(type){
      this.title = SKILL_DATA[type].title;
      this.desc = SKILL_DATA[type].desc;
    },
    showDefault: function(){
      this.showDesc('default');
    }
  },

  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
});
