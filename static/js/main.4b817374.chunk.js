(this["webpackJsonprandom-number-generators"]=this["webpackJsonprandom-number-generators"]||[]).push([[0],{113:function(e,t,n){},114:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),o=n(38),c=n.n(o),u=n(15),s=n.n(u),d=n(18),l=n(14),b=n(26),m=n(173),v=n(174),h=n(68),p=n(164),f=n(157),g=n(154),j=n(159),O=n(156),x=n(166),k=n(19),C=n(64);!function(e){e.MiddleSquares="1",e.LinearCongruential="2",e.MixedCongruential="3",e.CombinedCongruential="4",e.MultiplicativeCongruential="5"}(a||(a={}));var _,w,S,y,M,L,R,N,D,P,V,I,T,q,X=Object(b.b)({display:"flex",flexDirection:"column",gap:"16px","& > *":{width:"100%"}}),A=Object(b.b)({display:"flex",flexDirection:"row",gap:"16px","& > *":{width:"100%"},"@media (max-width: 550px)":{flexDirection:"column"}}),E=n(5),G=Object(b.b)(Object(C.a)(Object(C.a)({},A),{},{"& > *":{flexGrow:1}})),H=function(e){var t=function(t,n){var a=Number(n);if(!isNaN(a)||""===n){var r=Object(k.a)(e.inputValuesArr),i=Object(C.a)({},r[e.index]);i[t]=n,r[e.index]=i,e.setInputValues(r),e.validateCompleteInput(r)}};return Object(E.b)("div",{children:Object(E.c)("div",{css:[G],children:[Object(E.b)(O.a,{label:"Seed",variant:"outlined",value:e.inputValuesArr[e.index].seed,onChange:function(e){return t("seed",e.target.value)},InputProps:{readOnly:e.randomsListLength>0},focused:e.randomsListLength>0?!(e.randomsListLength>0):void 0,required:!0}),e.optionRNG!==a.MiddleSquares&&Object(E.c)(E.a,{children:[Object(E.b)(O.a,{label:"A",variant:"outlined",value:e.inputValuesArr[e.index].a,onChange:function(e){return t("a",e.target.value)},InputProps:{readOnly:e.randomsListLength>0},focused:e.randomsListLength>0?!(e.randomsListLength>0):void 0,required:!0}),e.optionRNG!==a.MultiplicativeCongruential&&e.optionRNG!==a.CombinedCongruential&&Object(E.b)(O.a,{label:"C",variant:"outlined",value:e.inputValuesArr[e.index].c,onChange:function(e){return t("c",e.target.value)},InputProps:{readOnly:e.randomsListLength>0},focused:e.randomsListLength>0?!(e.randomsListLength>0):void 0,required:!0}),Object(E.b)(O.a,{label:"M",variant:"outlined",value:e.inputValuesArr[e.index].m,onChange:function(e){return t("m",e.target.value)},InputProps:{readOnly:e.randomsListLength>0},focused:e.randomsListLength>0?!(e.randomsListLength>0):void 0,required:!0})]})]})})},K=n(87),F=n(158),W=n(151),z=n(152),J=n(175),B=n(60),Y=Object(b.b)({display:"flex",flexDirection:"column",gap:"16px"}),Q=Object(b.b)({border:"1px solid #ccc",borderRadius:"4px","&:hover":{border:"1px solid black"}}),U=function(e){return Object(E.c)("div",{css:Y,children:[Object(E.b)(J.a,{css:Q,children:Object(E.b)(K.a,{height:Math.min(300,30*e.numsList.length),width:"100%",itemSize:30,itemCount:e.numsList.length,overscanCount:10,children:function(t){var n=t.index,a=t.style;return Object(E.b)(F.a,{style:a,component:"div",disablePadding:!0,children:Object(E.b)(W.a,{style:{height:"".concat(30,"px")},onClick:function(){navigator.clipboard.writeText(String(e.numsList[n]))},children:Object(E.b)(z.a,{primary:e.numsList[n]})})},n)}})}),Object(E.b)(B.CSVLink,{data:[["Randoms"]].concat(Object(k.a)(e.numsList.map((function(e){return[e]})))),filename:"randoms.csv",style:{textDecoration:"none"},children:Object(E.b)(x.a,{variant:"outlined",fullWidth:!0,children:"Save as CSV"})})]})},Z=function(e){var t=[];return e.forEach((function(e){var n={};Object.keys(e).forEach((function(t){var a=e[t];""!==a&&(n[t]=Number(a))})),t.push(n)})),t},$=n(21),ee={1:{.995:0,.99:0,.975:0,.95:0,.9:.02,.5:.45,.1:2.71,.05:3.84,.025:5.02,.01:6.63,.005:7.88},2:{.995:.01,.99:.02,.975:.05,.95:.1,.9:.21,.5:1.39,.1:4.61,.05:5.99,.025:7.38,.01:9.21,.005:10.6},3:{.995:.07,.99:.11,.975:.22,.95:.35,.9:.58,.5:2.37,.1:6.25,.05:7.81,.025:9.35,.01:11.34,.005:12.84},4:{.995:.21,.99:.3,.975:.48,.95:.71,.9:1.06,.5:3.36,.1:7.78,.05:9.49,.025:11.14,.01:13.28,.005:14.86},5:{.995:.41,.99:.55,.975:.83,.95:1.15,.9:1.61,.5:4.35,.1:9.24,.05:11.07,.025:12.83,.01:15.09,.005:16.75},6:{.995:.68,.99:.87,.975:1.24,.95:1.64,.9:2.2,.5:5.35,.1:10.65,.05:12.59,.025:14.45,.01:16.81,.005:18.55},7:{.995:.99,.99:1.25,.975:1.69,.95:2.17,.9:2.83,.5:6.35,.1:12.02,.05:14.07,.025:16.01,.01:18.48,.005:20.28},8:{.995:1.34,.99:1.65,.975:2.18,.95:2.73,.9:3.49,.5:7.34,.1:13.36,.05:15.51,.025:17.53,.01:20.09,.005:21.96},9:{.995:1.73,.99:2.09,.975:2.7,.95:3.33,.9:4.17,.5:8.34,.1:14.68,.05:16.92,.025:19.02,.01:21.67,.005:23.59},10:{.995:2.16,.99:2.56,.975:3.25,.95:3.94,.9:4.87,.5:9.34,.1:15.99,.05:18.31,.025:20.48,.01:23.21,.005:25.19},11:{.995:2.6,.99:3.05,.975:3.82,.95:4.57,.9:5.58,.5:10.34,.1:17.28,.05:19.68,.025:21.92,.01:24.72,.005:26.76},12:{.995:3.07,.99:3.57,.975:4.4,.95:5.23,.9:6.3,.5:11.34,.1:18.55,.05:21.03,.025:23.34,.01:26.22,.005:28.3},13:{.995:3.57,.99:4.11,.975:5.01,.95:5.89,.9:7.04,.5:12.34,.1:19.81,.05:22.36,.025:24.74,.01:27.69,.005:29.82},14:{.995:4.07,.99:4.66,.975:5.63,.95:6.57,.9:7.79,.5:13.34,.1:21.06,.05:23.68,.025:26.12,.01:29.14,.005:31.32},15:{.995:4.6,.99:5.23,.975:6.27,.95:7.26,.9:8.55,.5:14.34,.1:22.31,.05:25,.025:27.49,.01:30.58,.005:32.8},16:{.995:5.14,.99:5.81,.975:6.91,.95:7.96,.9:9.31,.5:15.34,.1:23.54,.05:26.3,.025:28.85,.01:32,.005:34.27},17:{.995:5.7,.99:6.41,.975:7.56,.95:8.67,.9:10.09,.5:16.34,.1:24.77,.05:27.59,.025:30.19,.01:33.41,.005:35.72},18:{.995:6.26,.99:7.01,.975:8.23,.95:9.39,.9:10.87,.5:17.34,.1:25.99,.05:28.87,.025:31.53,.01:34.81,.005:37.16},19:{.995:6.84,.99:7.63,.975:8.91,.95:10.12,.9:11.65,.5:18.34,.1:27.2,.05:30.14,.025:32.85,.01:36.19,.005:38.58},20:{.995:7.43,.99:8.26,.975:9.59,.95:10.85,.9:12.44,.5:19.34,.1:28.41,.05:31.41,.025:34.17,.01:37.57,.005:40},21:{.995:8.03,.99:8.9,.975:10.28,.95:11.59,.9:13.24,.5:20.34,.1:29.62,.05:32.67,.025:35.48,.01:38.93,.005:41.4},22:{.995:8.64,.99:9.54,.975:10.98,.95:12.34,.9:14.04,.5:21.34,.1:30.81,.05:33.92,.025:36.78,.01:40.29,.005:42.8},23:{.995:9.26,.99:10.2,.975:11.69,.95:13.09,.9:14.85,.5:22.34,.1:32.01,.05:35.17,.025:38.08,.01:41.64,.005:44.18},24:{.995:9.89,.99:10.86,.975:12.4,.95:13.85,.9:15.66,.5:23.34,.1:33.2,.05:36.42,.025:39.36,.01:42.98,.005:45.56},25:{.995:10.52,.99:11.52,.975:13.12,.95:14.61,.9:16.47,.5:24.34,.1:34.28,.05:37.65,.025:40.65,.01:44.31,.005:46.93},26:{.995:11.16,.99:12.2,.975:13.84,.95:15.38,.9:17.29,.5:25.34,.1:35.56,.05:38.89,.025:41.92,.01:45.64,.005:48.29},27:{.995:11.81,.99:12.88,.975:14.57,.95:16.15,.9:18.11,.5:26.34,.1:36.74,.05:40.11,.025:43.19,.01:46.96,.005:49.65},28:{.995:12.46,.99:13.57,.975:15.31,.95:16.93,.9:18.94,.5:27.34,.1:37.92,.05:41.34,.025:44.46,.01:48.28,.005:50.99},29:{.995:13.12,.99:14.26,.975:16.05,.95:17.71,.9:19.77,.5:28.34,.1:39.09,.05:42.56,.025:45.72,.01:49.59,.005:52.34},30:{.995:13.79,.99:14.95,.975:16.79,.95:18.49,.9:20.6,.5:29.34,.1:40.26,.05:43.77,.025:46.98,.01:50.89,.005:53.67},40:{.995:20.71,.99:22.16,.975:24.43,.95:26.51,.9:29.05,.5:39.34,.1:51.81,.05:55.76,.025:59.34,.01:63.69,.005:66.77},50:{.995:27.99,.99:29.71,.975:32.36,.95:34.76,.9:37.69,.5:49.33,.1:63.17,.05:67.5,.025:71.42,.01:76.15,.005:79.49},60:{.995:35.53,.99:37.48,.975:40.48,.95:43.19,.9:46.46,.5:59.33,.1:74.4,.05:79.08,.025:83.3,.01:88.38,.005:91.95},70:{.995:43.28,.99:45.44,.975:48.76,.95:51.74,.9:55.33,.5:69.33,.1:85.53,.05:90.53,.025:95.02,.01:100.42,.005:104.22},80:{.995:51.17,.99:53.54,.975:57.15,.95:60.39,.9:64.28,.5:79.33,.1:96.58,.05:101.88,.025:106.63,.01:112.33,.005:116.32},90:{.995:59.2,.99:61.75,.975:65.65,.95:69.13,.9:73.29,.5:89.33,.1:107.57,.05:113.14,.025:118.14,.01:124.12,.005:128.3},100:{.995:67.33,.99:70.06,.975:74.22,.95:77.93,.9:82.36,.5:99.33,.1:118.5,.05:124.34,.025:129.56,.01:135.81,.005:140.17}},te=(w=_=function e(){Object($.a)(this,e)},_.range=void 0,_.k=void 0,_.classes=void 0,_.table=void 0,_.X0=void 0,_.X1=void 0,_.validate=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length<=4)&&n in ee[1]){e.next=2;break}return e.abrupt("return",Promise.reject("Not enough information provided to make the validation"));case 2:if(_.table=[],_.range=t[t.length-1]-t[0],_.k=Math.floor(1+3.322*Math.log10(t.length)),_.classes=1/_.k,_.createTable(t),1!==_.k){e.next=9;break}return e.abrupt("return",Promise.reject("The randoms are not enough to validate the distribution"));case 9:return _.getTheoreticalValue(n),a={isValid:_.X0<_.X1,range:_.range,k:_.k,classes:_.classes,table:_.table,X0:_.X0,X1:_.X1},e.abrupt("return",a);case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),_.createTable=function(e){var t=0,n=0;for(_.X0=0;t<_.k;){for(var a=t*_.classes,r=(t+1)*_.classes,i=0;e[n]<=r;)i++,++n<e.length&&e[n]>r&&i<5&&(r=(++t+1)*_.classes);if(i<5&&t>=_.k-1){var o=_.table.pop();a=o.start,i+=o.absolute}var c=r-a,u=e.length*c,s={start:a,end:r,absolute:i,probability:c,theoretical:u,result:Math.pow(i-u,2)/u};_.table.push(s),_.X0+=s.result,t++}_.k=_.table.length},_.getTheoreticalValue=function(e){_.X1=ee[_.k-1][e]},w),ne={1:{.2:.9,.1:.95,.05:.975,.02:.99,.01:.995,.005:.9975,.002:.999,.001:.9995},2:{.2:.68337,.1:.77639,.05:.84189,.02:.9,.01:.92929,.005:.95,.002:.96838,.001:.97764},3:{.2:.56481,.1:.63604,.05:.7076,.02:.78456,.01:.829,.005:.86428,.002:.9,.001:.92065},4:{.2:.49265,.1:.56522,.05:.62394,.02:.68887,.01:.73424,.005:.77639,.002:.82217,.001:.85047},5:{.2:.44698,.1:.50945,.05:.56328,.02:.62718,.01:.66853,.005:.70543,.002:.75,.001:.78137},6:{.2:.41037,.1:.46799,.05:.51926,.02:.5774,.01:.61661,.005:.65287,.002:.69571,.001:.72479},7:{.2:.38148,.1:.43607,.05:.48342,.02:.53844,.01:.57581,.005:.60975,.002:.65071,.001:.6793},8:{.2:.35831,.1:.40962,.05:.45427,.02:.50654,.01:.54179,.005:.57429,.002:.61368,.001:.64098},9:{.2:.3391,.1:.38746,.05:.43001,.02:.4796,.01:.51332,.005:.54443,.002:.5821,.001:.60846},10:{.2:.3226,.1:.36866,.05:.40925,.02:.45562,.01:.48893,.005:.51872,.002:.555,.001:.58042},11:{.2:.30829,.1:.35242,.05:.39122,.02:.4367,.01:.4677,.005:.49539,.002:.53135,.001:-55588},12:{.2:.29577,.1:.33815,.05:.37543,.02:.41918,.01:.44905,.005:.47672,.002:.51047,.001:.53422},13:{.2:.2847,.1:.32549,.05:.36143,.02:.40362,.01:.43247,.005:.45921,.002:.49189,.001:.5149},14:{.2:.27481,.1:.31417,.05:.3489,.02:.3897,.01:.41762,.005:.44352,.002:.4752,.001:.49753},15:{.2:.26589,.1:.30397,.05:.3375,.02:.37713,.01:.4042,.005:.42934,.002:.45611,.001:.48182},16:{.2:.25778,.1:.29472,.05:.32733,.02:.36571,.01:.39201,.005:.41644,.002:.44637,.001:.4675},17:{.2:.25039,.1:.28627,.05:.31796,.02:.35528,.01:.38086,.005:.40464,.002:.4338,.001:.4554},18:{.2:.2436,.1:.27851,.05:.30936,.02:.34569,.01:.37062,.005:.3938,.002:.42224,.001:.44234},19:{.2:.23735,.1:.27136,.05:.30143,.02:.33685,.01:.36117,.005:.38379,.002:.41156,.001:.43119},20:{.2:.23156,.1:.26473,.05:.29408,.02:.32866,.01:.35241,.005:.37451,.002:.40165,.001:.42085},21:{.2:.22517,.1:.25858,.05:.28724,.02:.32104,.01:.34426,.005:.36588,.002:.39243,.001:.41122},22:{.2:.22115,.1:.25283,.05:.28087,.02:.31394,.01:.33666,.005:.35782,.002:.38382,.001:.40223},23:{.2:.21646,.1:.24746,.05:.2749,.02:.30728,.01:.32954,.005:.35027,.002:.37575,.001:.3938},24:{.2:.21205,.1:.24242,.05:.26931,.02:.30104,.01:.32286,.005:.34318,.002:.36787,.001:.38588},25:{.2:.2079,.1:.23768,.05:.26404,.02:.29518,.01:.31657,.005:.33651,.002:.36104,.001:.37743},26:{.2:.20399,.1:.2332,.05:.25908,.02:.28962,.01:.30963,.005:.33022,.002:.35431,.001:.37139},27:{.2:.2003,.1:.22898,.05:.25438,.02:.28438,.01:.30502,.005:.32425,.002:.34794,.001:.36473},28:{.2:.1968,.1:.22497,.05:.24993,.02:.27942,.01:.29971,.005:.31862,.002:.3419,.001:.35842},29:{.2:.19348,.1:.22117,.05:.24571,.02:.27471,.01:.29466,.005:.31327,.002:.33617,.001:.35242},30:{.2:.19032,.1:.21756,.05:.2417,.02:.27023,.01:.28986,.005:.30818,.002:.33072,.001:.34672},31:{.2:.18732,.1:.21412,.05:.23788,.02:.26596,.01:.28529,.005:.30333,.002:.32553,.001:.34129},32:{.2:.18445,.1:.21085,.05:.23424,.02:.26189,.01:.28094,.005:.2987,.002:.32058,.001:.33611},33:{.2:.18171,.1:.20771,.05:.23076,.02:.25801,.01:.27577,.005:.29428,.002:.31584,.001:.33115},34:{.2:.17909,.1:.21472,.05:.22743,.02:.25429,.01:.27271,.005:.29005,.002:.31131,.001:.32641},35:{.2:.17659,.1:.20185,.05:.22425,.02:.25073,.01:.26897,.005:.286,.002:.30597,.001:.32187},36:{.2:.17418,.1:.1991,.05:.22119,.02:.24732,.01:.26532,.005:.28211,.002:.30281,.001:.31751},37:{.2:.17188,.1:.19646,.05:.21826,.02:.24404,.01:.2618,.005:.27838,.002:.29882,.001:.31333},38:{.2:.16966,.1:.19392,.05:.21544,.02:.24089,.01:.25843,.005:.27483,.002:.29498,.001:.30931},39:{.2:.16753,.1:.19148,.05:.21273,.02:.23785,.01:.25518,.005:.27135,.002:.29125,.001:.30544},40:{.2:.16547,.1:.18913,.05:.21012,.02:.23494,.01:.25205,.005:.26803,.002:.28772,.001:.30171},41:{.2:.16349,.1:.18687,.05:.2076,.02:.23213,.01:.24904,.005:.26482,.002:.28429,.001:.29811},42:{.2:.16158,.1:.18468,.05:.20517,.02:.22941,.01:.24613,.005:.26173,.002:.28097,.001:.29465},43:{.2:.15974,.1:.18257,.05:.20283,.02:.22679,.01:.24332,.005:.25875,.002:.27778,.001:.2913},44:{.2:.15795,.1:.18051,.05:.20056,.02:.22426,.01:.2406,.005:.25587,.002:.27468,.001:.28806},45:{.2:.15623,.1:.17856,.05:.19837,.02:.22181,.01:.23798,.005:.25308,.002:.27169,.001:.28493},46:{.2:.15457,.1:.17665,.05:.19625,.02:.21944,.01:.23544,.005:.25038,.002:.2688,.001:.2819},47:{.2:.15295,.1:.17481,.05:.1942,.02:.21715,.01:.23298,.005:.24776,.002:.266,.001:.27896},48:{.2:.15139,.1:.17301,.05:.19221,.02:.21493,.01:.23059,.005:.24523,.002:.26328,.001:.27611},49:{.2:.14987,.1:.17128,.05:.19028,.02:.21281,.01:.22832,.005:.24281,.002:.26069,.001:.27339},50:{.2:.1484,.1:.16959,.05:.18841,.02:.21068,.01:.22604,.005:.24039,.002:.25809,.001:.27067}},ae=(y=S=function e(){Object($.a)(this,e)},S.table=void 0,S.deviation_max_plus=void 0,S.deviation_max_minus=void 0,S.deviation_max=void 0,S.deviation_critical=void 0,S.validate=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length<1)&&n in ne[1]){e.next=2;break}return e.abrupt("return",Promise.reject("Not enough information provided to make the validation"));case 2:return S.table=[],S.deviation_max_plus=0,S.deviation_max_minus=0,S.deviation_max=0,S.createTable(t),S.getTheoreticalValue(n),a={isValid:S.deviation_max<S.deviation_critical,table:S.table,deviation_max_plus:S.deviation_max_plus,deviation_max_minus:S.deviation_max_minus,deviation_max:S.deviation_max,deviation_critical:S.deviation_critical},e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S.createTable=function(e){var t=1,n=e.length;e.forEach((function(e){var a=e,r=t/n,i=Math.abs(r-a),o=1!==t?Math.abs(a-S.table[t-2].cdf_empirical):a,c={cdf:a,cdf_empirical:r,deviation_plus:i,deviation_minus:o};S.table.push(c),S.deviation_max_plus=Math.max(S.deviation_max_plus,i),S.deviation_max_minus=Math.max(S.deviation_max_minus,o),S.deviation_max=Math.max(S.deviation_max_plus,S.deviation_max_minus),t++}))},S.getTheoreticalValue=function(e){var t=S.table.length;if(t>50)switch(e){case.2:return 1.07/Math.sqrt(t);case.1:return 1.22/Math.sqrt(t);case.05:return 1.36/Math.sqrt(t);case.02:return 1.52/Math.sqrt(t);case.01:return 1.63/Math.sqrt(t);case.005:return 1.73/Math.sqrt(t);case.002:return 1.85/Math.sqrt(t);case.001:return 1.95/Math.sqrt(t)}S.deviation_critical=ne[t][e]},y),re=(L=M=function e(){Object($.a)(this,e)},M.randoms=void 0,M.validateInput=function(e){return e&&e.seed&&e.seed>0&&e.a&&e.a>0&&e.c&&e.c>0&&e.m&&e.m>0},M.generateRandoms=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(M.validateInput(t)&&!(n&&n<=0)){e.next=2;break}return e.abrupt("return",Promise.reject("The parameters are not valid"));case 2:M.randoms=[],a=new Set,r=t.seed;case 5:if(a.has(r)){e.next=13;break}if(M.randoms.push(r/t.m),a.add(r),r=(t.a*r+t.c)%t.m,!n||M.randoms.length!==n){e.next=11;break}return e.abrupt("return",M.randoms);case 11:e.next=5;break;case 13:return e.abrupt("return",M.randoms);case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),M.getRandoms=function(){return M.randoms?M.randoms:[]},M.validate=function(){var e=Object(d.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(M.randoms){e.next=2;break}return e.abrupt("return",Promise.reject("To validate the randoms you need to generate them first"));case 2:return e.abrupt("return","CS"===t?te.validate(M.randoms.sort(),n):ae.validate(M.randoms.sort(),n));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),L),ie=n(61),oe=(N=R=function e(){Object($.a)(this,e)},R.randoms=void 0,R.validateInput=function(e){return e&&e.seed&&e.seed>0&&e.a&&e.a>0&&!e.c&&e.m&&e.m>0&&e.m>e.a&&e.m>e.seed},R.generateRandoms=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(R.validateInput(t)&&!(n&&n<=0)){e.next=2;break}return e.abrupt("return",Promise.reject("The parameters are not valid"));case 2:R.randoms=[],a=new Set,r=t.seed;case 5:if(a.has(r)){e.next=13;break}if(R.randoms.push(r/t.m),a.add(r),r=t.a*r%t.m,!n||R.randoms.length!==n){e.next=11;break}return e.abrupt("return",R.randoms);case 11:e.next=5;break;case 13:return e.abrupt("return",R.randoms);case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),R.getRandoms=function(){return R.randoms?R.randoms:[]},R.validate=function(){var e=Object(d.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(R.randoms){e.next=2;break}return e.abrupt("return",Promise.reject("To validate the randoms you need to generate them first"));case 2:return e.abrupt("return","CS"===t?te.validate(R.randoms.sort(),n):ae.validate(R.randoms.sort(),n));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),N),ce=(P=D=function e(){Object($.a)(this,e)},D.randoms=void 0,D.validateInput=function(e){if(!e||e.length<2)return!1;var t,n=Object(ie.a)(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;if(!a||!a.seed||a.seed<=0||!a.a||a.a<=0||void 0!==a.c||!a.m||a.m<=0)return!1}}catch(r){n.e(r)}finally{n.f()}return!0},D.generateRandoms=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a,r,i,o,c,u,d,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D.validateInput(t)&&!(n&&n<=0)){e.next=2;break}return e.abrupt("return",Promise.reject("The parameters are not valid"));case 2:D.randoms=[],a=t.length,r=[],i=s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe.generateRandoms(t[n]).then((function(e){e=e.map((function(e){return e*t[n].m})),r.push(e)}),(function(e){return Promise.reject(e)}));case 2:case"end":return e.stop()}}),e)})),o=0;case 7:if(!(o<a)){e.next=12;break}return e.delegateYield(i(o),"t0",9);case 9:o++,e.next=7;break;case 12:c=1,u=0,t.forEach((function(e){c*=e.m-1,u=Math.max(u,e.m)})),c/=2,d=0;case 17:if(!(d<c)){e.next=25;break}if(l=D.getNextRandom(r,d,u,a),D.randoms.push(l>0?l/u:(u-1)/u),d++,!n||d!==n){e.next=23;break}return e.abrupt("return",D.randoms);case 23:e.next=17;break;case 25:return e.abrupt("return",D.randoms);case 26:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),D.getNextRandom=function(e,t,n,a){for(var r=0,i=1,o=0;o<a;o++)r+=i*e[o][t%e[o].length],i*=-1;return r>=0?r%n:r%n+n},D.getRandoms=function(){return D.randoms?D.randoms:[]},P),ue=(I=V=function e(){Object($.a)(this,e)},V.randoms=void 0,V.values=void 0,V.validateInput=function(e){return e&&e.seed&&e.seed>0&&e.a&&e.a>0&&e.c&&e.c>0&&e.m&&e.m>0},V.validHullDobell=function(){var e=!0;return{rule1:function(t,n){for(var a=2,r=Math.min(t,n);a<=r;){if(n%a===0&&t%a===0)return e=!1,{areRelativePrimes:!1};a++}return{areRelativePrimes:!0}}(V.values.c,V.values.m),rule2:function(t,n){var a,r=function(e){var t,n,a=[],r=[];for(t=2;t<=e;++t)if(!a[t])for(e%t===0&&r.push(t),n=t<<1;n<=e;n+=t)a[n]=!0;return r}(n),i=Object(ie.a)(r);try{for(i.s();!(a=i.n()).done;){var o=a.value;if(n%o===0&&(t-1)%o!==0)return e=!1,{primeDivision:!1}}}catch(c){i.e(c)}finally{i.f()}return{primeDivision:!0}}(V.values.a,V.values.m),rule3:function(t,n){var a=n%4===0,r=(t-1)%4===0;return a&&!r&&(e=!1),{mDivision:a,aDivision:r}}(V.values.a,V.values.m),general:{check:e}}},V.generateRandoms=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(V.values=t,V.validateInput(t)&&!(n&&n<=0)){e.next=3;break}return e.abrupt("return",Promise.reject("The parameters are not valid"));case 3:V.randoms=[],a=new Set,r=t.seed;case 6:if(a.has(r)){e.next=14;break}if(V.randoms.push(r/t.m),a.add(r),r=(t.a*r+t.c)%t.m,!n||V.randoms.length!==n){e.next=12;break}return e.abrupt("return",V.randoms);case 12:e.next=6;break;case 14:return e.abrupt("return",V.randoms);case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),V.getRandoms=function(){return V.randoms?V.randoms:[]},V.validate=function(){var e=Object(d.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(V.randoms){e.next=2;break}return e.abrupt("return",Promise.reject("To validate the randoms you need to generate them first"));case 2:return e.abrupt("return","CS"===t?te.validate(V.randoms.sort(),n):ae.validate(V.randoms.sort(),n));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),I),se=(q=T=function e(){Object($.a)(this,e)},T.randoms=void 0,T.validateInput=function(e){return e&&e.seed&&e.seed>0&&!e.a&&!e.c&&!e.m},T.generateRandoms=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(T.validateInput(t)&&!(n&&n<=0)){e.next=2;break}return e.abrupt("return",Promise.reject("The parameters are not valid"));case 2:T.randoms=[],a=new Set,r=t.seed;case 5:if(a.has(r)){e.next=13;break}if(T.randoms.push(r/1e4),a.add(r),r=T.getNextRandom(r),!n||T.randoms.length!==n){e.next=11;break}return e.abrupt("return",T.randoms);case 11:e.next=5;break;case 13:return e.abrupt("return",T.randoms);case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),T.getRandoms=function(){return T.randoms?T.randoms:[]},T.getNextRandom=function(e){for(var t=""+Math.pow(e,2);t.length<8;)t="0"+t;return Number(t.substr(2,4))},q),de=n(167),le=n(168),be=n(169),me=n(170),ve=n(171),he=n(172),pe=Object(b.b)({border:"1px solid #ccc",borderRadius:"4px","&:hover":{border:"1px solid black"}}),fe=function(e){var t={start:"Start",end:"End",absolute:"FAbsolute",probability:"Probability",theoretical:"Theoretical",result:"Result"},n={X0:"X0",X1:"X1",classes:"Classes",k:"K",range:"Range",isValid:"Valid"},a={cdf:"CDF",cdf_empirical:"CDF Empirical",deviation_plus:"Deviation +",deviation_minus:"Deviation -"},r={deviation_max_plus:"D +",deviation_max_minus:"D -",deviation_max:"Dmax",deviation_critical:"D Critical",isValid:"Valid"},i=function(){return"classes"in e.data},o=function(){return"classes"in e.data?t:a};return Object(E.c)("div",{css:X,children:[Object(E.b)("h3",{children:i()?"Chi Square":"Kolmogorov Smirnov"}),Object(E.b)("div",{css:A,children:Object.keys(i()?n:r).map((function(t){return Object(E.b)(O.a,{label:(i()?n:r)[t],variant:"outlined",value:e.data[t],InputProps:{readOnly:!0},color:"isValid"===t?e.data[t]?"success":"error":void 0,focused:"isValid"===t},"chi-square-value-".concat(t))}))}),Object(E.b)(de.a,{css:pe,sx:{maxHeight:350},children:Object(E.c)(le.a,{size:"small",children:[Object(E.b)(be.a,{children:Object(E.b)(me.a,{children:Object.keys(o()).map((function(e,t){return Object(E.b)(ve.a,{align:"left",children:o()[e]},"validation-table-header-".concat(t))}))})}),Object(E.b)(he.a,{children:e.data.table.map((function(e,t){return Object(E.b)(me.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:Object.keys(o()).map((function(n,a){return Object(E.b)(ve.a,{align:"left",children:e[n]},"validation-table-cell-".concat(t,"-").concat(a))}))},"validation-table-row-".concat(t))}))})]})}),Object(E.b)(B.CSVLink,{data:e.data.table,filename:"validation.csv",style:{textDecoration:"none"},children:Object(E.b)(x.a,{variant:"outlined",fullWidth:!0,children:"Save as CSV"})})]})},ge=n(155),je=Object(b.b)({position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:600,backgroundColor:"white",boxShadow:"24px",padding:"15px",border:"1px solid #ccc",borderRadius:"4px","&:hover":{border:"1px solid black"}}),Oe=function(e){return Object(E.b)(ge.a,{open:e.open,onClose:function(){return e.setOpen(!1)},children:Object(E.c)("div",{css:je,children:[Object(E.b)(h.a,{id:"modal-modal-title",variant:"h6",component:"h2",children:e.title}),Object(E.b)(h.a,{id:"modal-modal-description",sx:{mt:2},children:e.message})]})})},xe=Object(b.b)({margin:"32px 24px","@media (max-width: 600px)":{margin:"24px 16px"},"& > *":{width:"100%"}}),ke=function(){var e={seed:"",a:"",c:"",m:""},t={rule1:{areRelativePrimes:!1},rule2:{primeDivision:!1},rule3:{mDivision:!1,aDivision:!1},general:{check:!1}},n=Object(r.useState)("1"),i=Object(l.a)(n,2),o=i[0],c=i[1],u=Object(r.useState)(""),b=Object(l.a)(u,2),k=b[0],C=b[1],_=Object(r.useState)("1"),w=Object(l.a)(_,2),S=w[0],y=w[1],M=Object(r.useState)([e]),L=Object(l.a)(M,2),R=L[0],N=L[1],D=Object(r.useState)(!0),P=Object(l.a)(D,2),V=P[0],I=P[1],T=Object(r.useState)(t),q=Object(l.a)(T,2),G=q[0],K=q[1],F=Object(r.useState)([]),W=Object(l.a)(F,2),z=W[0],J=W[1],B=Object(r.useState)({}),Y=Object(l.a)(B,2),Q=Y[0],$=Y[1],ee=Object(r.useState)("0.05"),te=Object(l.a)(ee,2),ne=te[0],ae=te[1],ie=Object(r.useState)(!1),de=Object(l.a)(ie,2),le=de[0],be=de[1],me=Object(r.useState)(""),ve=Object(l.a)(me,2),he=ve[0],pe=ve[1],ge=Object(r.useState)(""),je=Object(l.a)(ge,2),ke=je[0],Ce=je[1],_e={};_e[a.MiddleSquares]=["seed"],_e[a.LinearCongruential]=["seed","a","c","m"],_e[a.MixedCongruential]=["seed","a","c","m"],_e[a.CombinedCongruential]=["seed","a","m"],_e[a.MultiplicativeCongruential]=["seed","a","m"];var we=function(){var t=Object(d.a)(s.a.mark((function t(n,r){var i,o,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=[],(o=Number(n))||""===n){t.next=4;break}return t.abrupt("return");case 4:for(""===n||"1"===n&&r===a.CombinedCongruential?(y(n),o=2):y(String(o)),c=0;c<o;c++)i.push(e);N(i),Se(i);case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),Se=function(e){var t=!0;e.forEach((function(e){return _e[o].forEach((function(n){return t=t&&""!==e[n]}))})),I(!t)},ye=function(){return o===a.MiddleSquares?se:o===a.LinearCongruential?re:o===a.MixedCongruential?ue:o===a.MultiplicativeCongruential?oe:ce},Me=function(){var e=Object(d.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=""===k?void 0:Number(k),n=o===a.CombinedCongruential?Z(R):Z(R)[0],e.next=4,ye().generateRandoms(n,t).then((function(e){J(e),o===a.MixedCongruential&&K(ue.validHullDobell())}),(function(e){console.log(e),Re("Error during generation",e)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Le=function(e,t){ye().validate(e,t).then((function(e){$(e)}),(function(e){console.log(e),$({}),Re("Error during validation",e)}))},Re=function(e,t){be(!0),pe(e),Ce(t)};return Object(E.c)("div",{children:[Object(E.b)("header",{children:Object(E.b)(m.a,{position:"static",children:Object(E.b)(v.a,{variant:"dense",children:Object(E.b)(h.a,{variant:"h6",color:"inherit",component:"div",children:"Random Number Generator"})})})}),Object(E.c)("div",{css:xe,children:[Object(E.c)("form",{css:X,children:[Object(E.c)(p.a,{fullWidth:!0,focused:z.length>0?!(z.length>0):void 0,children:[Object(E.b)(f.a,{children:"Random Number Generator"}),Object(E.c)(g.a,{value:o,label:"Random Number Generator",onChange:function(t){var n=t.target.value;c(n);var r=n!==a.CombinedCongruential?"1":"2";we(r,n),y(""),Se([e])},inputProps:{readOnly:z.length>0},children:[Object(E.b)(j.a,{value:a.MiddleSquares,children:"Middle Squares"}),Object(E.b)(j.a,{value:a.LinearCongruential,children:"Linear Congruential"}),Object(E.b)(j.a,{value:a.MixedCongruential,children:"Mixed Congruential"}),Object(E.b)(j.a,{value:a.CombinedCongruential,children:"Combined Congruential"}),Object(E.b)(j.a,{value:a.MultiplicativeCongruential,children:"Multiplicative Congruential"})]})]}),Object(E.b)("br",{}),Object(E.b)(O.a,{label:"Number of randoms",variant:"outlined",value:k,onChange:function(e){return t=e.target.value,void((Number(t)||""===t)&&(C(t),Se(R)));var t},InputProps:{readOnly:z.length>0},focused:z.length>0?!(z.length>0):void 0}),a.CombinedCongruential===o&&Object(E.b)(O.a,{label:"Number of generators",variant:"outlined",value:S,onChange:function(e){return we(e.target.value,o)},InputProps:{readOnly:z.length>0},focused:z.length>0?!(z.length>0):void 0}),R.map((function(e,t){return Object(E.b)(H,{inputValuesArr:R,setInputValues:N,index:t,optionRNG:o,validateCompleteInput:Se,randomsListLength:z.length},"input-values-".concat(t))})),0===z.length&&Object(E.b)(x.a,{variant:"contained",onClick:Me,disabled:V,children:"Generate randoms"}),z.length>0&&Object(E.b)(x.a,{variant:"contained",color:"error",onClick:function(){J([]),$({}),K(t)},disabled:V,children:"Start again"})]}),Object(E.b)("br",{}),z.length>0&&Object(E.c)(E.a,{children:[o===a.MixedCongruential&&Object(E.c)(E.a,{children:[Object(E.b)("h1",{children:"Hull\u2013Dobell Theorem"}),Object(E.c)("p",{children:["The generator"," ",Object(E.c)("strong",{children:[G.general.check?"has":"does not have"," full period"]})]}),Object(E.c)("ol",{children:[Object(E.c)("li",{children:[Object(E.b)("strong",{children:R[0].c})," and"," ",Object(E.b)("strong",{children:R[0].m})," are"," ",G.rule1.areRelativePrimes?"":"not"," relative primes"]}),Object(E.c)("li",{children:["All primes that divide ",Object(E.b)("strong",{children:R[0].m}),","," ",G.rule2.primeDivision?"":"do not"," divide (",Object(E.b)("strong",{children:R[0].a})," - 1)"," "]}),Object(E.c)("li",{children:["4"," ",G.rule3.mDivision?"divides":"does not divide"," ",Object(E.b)("strong",{children:R[0].m}),","," ",G.rule3.mDivision?G.rule3.aDivision?"so 4 divides":"but 4 does not divide":"so it does not have to divide"," ","(",Object(E.b)("strong",{children:R[0].a})," - 1)"]})]}),Object(E.b)("br",{})]}),Object(E.b)("h1",{children:"Random Numbers Generated"}),Object(E.c)("p",{children:["Total randoms generated: ",Object(E.b)("strong",{children:z.length})]}),Object(E.b)(U,{numsList:z}),Object(E.b)("br",{}),(o===a.LinearCongruential||o===a.MultiplicativeCongruential||o===a.MixedCongruential)&&Object(E.c)(E.a,{children:[Object(E.b)("h1",{children:"Validation"}),Object(E.c)("div",{css:X,children:[Object(E.b)(O.a,{label:"Alpha",variant:"outlined",value:ne,onChange:function(e){return t=e.target.value,void(isNaN(Number(t))||ae(t));var t}}),Object(E.c)("div",{css:A,children:[Object(E.b)(x.a,{variant:"contained",onClick:function(){return Le("CS",Number(ne))},disabled:z.length<10,children:"Chi Square"}),Object(E.b)(x.a,{variant:"contained",onClick:function(){return Le("KS",Number(ne))},children:"Kolmogorov Smirnov"})]}),Q.table&&Object(E.b)(fe,{data:Q})]})]})]})]}),Object(E.b)(Oe,{open:le,setOpen:be,title:he,message:ke})]})},Ce=n(2),_e=function(){return Object(Ce.jsx)("div",{className:"App",children:Object(Ce.jsx)(ke,{})})};n(113);c.a.render(Object(Ce.jsx)(i.a.StrictMode,{children:Object(Ce.jsx)(_e,{})}),document.getElementById("root"))}},[[114,1,2]]]);
//# sourceMappingURL=main.4b817374.chunk.js.map