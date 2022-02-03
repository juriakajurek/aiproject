"use strict";(self.webpackChunkaiproject=self.webpackChunkaiproject||[]).push([[986],{5378:function(e,t,r){r.d(t,{E:function(){return s}});var n=r(727),a=r(2791),l=r(1003).s.p((function(e){return(0,n._)({marginTop:5,marginBottom:-5,fontSize:12,fontWeight:500,color:"red",height:0,overflow:"visible"},e.theme.errorText?(0,n._)({},e.theme.errorText):{})}));function s(e){return e.value&&e.value.length?a.createElement(l,Object.assign({},e),e.value):a.createElement(a.Fragment,null)}},8986:function(e,t,r){r.r(t),r.d(t,{default:function(){return h}});var n=r(5861),a=r(7757),l=r.n(a),s=r(2791),i=r(2570),o=r(5378),m=r(727),u=r(1003),c=u.s.div({position:"relative",display:"inline",width:"100%",maxWidth:"100%",cursor:"pointer","&:after":{content:"''",width:0,height:0,position:"absolute",pointerEvents:"none",top:".3em",right:".75em",borderTop:"8px solid black",opacity:.5,borderLeft:"5px solid transparent",borderRight:"5px solid transparent"}}),d=u.s.select({WebkitAppearance:"none",MozAppearance:"none",appearance:"none",padding:"1em 2em 1em 1em",border:"none",width:"100%",fontFamily:"inherit",fontSize:"inherit",cursor:"pointer",outline:"none","&::-ms-expand":{display:"none"}}),p=u.s.option((function(e){return(0,m._)({width:"100%"},e.theme.selectOption?(0,m._)({},e.theme.selectOption):{})}));var g=(0,u.s)((function(e){return s.createElement(c,null,s.createElement(d,Object.assign({},e,e.register(),{defaultValue:""}),s.createElement(p,{key:"empty-option",value:"",disabled:!0,hidden:!0,style:{display:"none"}}),e.options.map((function(e){return s.createElement(p,{key:"option"+e},e)}))))}))((function(e){return(0,m._)({boxSizing:"border-box"},e.theme.genderSelect?(0,m._)({},e.theme.genderSelect):{})})),f=u.s.div({position:"relative"}),b=(0,u.s)(i.L)((function(e){return(0,m._)({},e.theme.genderSelectLabel?(0,m._)({},e.theme.genderSelectLabel):{})}));function E(e){return s.createElement(f,null,s.createElement(b,{htmlFor:"select-gender"},"Gender *"),s.createElement(g,Object.assign({id:"select-gender"},e,{options:["Male","Female","Prefer not to say"]})))}function h(e){var t,r,a,c,d,p,g,f,b=e.setCurrentPage,h=e.dictionary,w=e.signUpFields,v=(0,i.u)(),x=v.register,N=v.handleSubmit,S=v.formState,y=S.errors,k=S.isSubmitting,z=v.reset,F=(0,m.u)(),L=F.signUp,C=F.signIn,O=function(){var e=(0,n.Z)(l().mark((function e(t){var r,n,a,s,i;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.email&&t.password&&t.passwordConfirm){e.next=2;break}return e.abrupt("return");case 2:if(t.password===t.passwordConfirm){e.next=6;break}return u.t.error(h.errorPasswordsDoNotMatch),z(),e.abrupt("return");case 6:r={createdAt:(new Date).toISOString()},n=0,a=["firstName","lastName","fullName","dateOfBirth","gender","phoneNumber"];case 8:if(!(n<a.length)){e.next=20;break}if(s=a[n],!w[s]){e.next=17;break}if(!t[s]){e.next=15;break}r[s]=""+t[s],e.next=17;break;case 15:return u.t.error("Missing sign up field value"),e.abrupt("return");case 17:n++,e.next=8;break;case 20:return e.next=22,L(t.email,t.password,r);case 22:if(!(i=e.sent).success){e.next=29;break}return b("SignIn"),e.next=27,C(t.email,t.password);case 27:e.next=30;break;case 29:"BadFormat"===i.errorCode?(z(),u.t.error(h.errorBadInputFormat)):"BadPasswordLength"===i.errorCode?u.t.error(h.errorPasswordTooShort):"UserExists"===i.errorCode&&(z(),u.t.error(h.errorUserAlreadyExists));case 30:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B={minLength:{value:8,message:"Password must be at least 8 characters long"},maxLength:{value:100,message:"Password too long"},pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/gm,message:"Must contain a digit and uppercase and lowercase letters"}};return s.createElement(i.F,{onSubmit:N(O)},s.createElement(i.H,null,h.signUpHeader),s.createElement(i.S,{size:"medium"}),s.createElement(i.E,{register:function(){return x("email")},label:h.newEmailLabel,disabled:k}),w.firstName&&s.createElement(s.Fragment,null,s.createElement(i.S,{size:"xlarge"}),s.createElement(i.I,{register:function(){return x("firstName","boolean"===typeof w.firstName?{}:w.firstName)},label:h.newFirstNameLabel||"",disabled:k}),s.createElement(o.E,{value:null==(t=y.firstName)?void 0:t.message})),w.lastName&&s.createElement(s.Fragment,null,s.createElement(i.S,{size:"xlarge"}),s.createElement(i.I,{register:function(){return x("lastName","boolean"===typeof w.lastName?{}:w.lastName)},label:h.newLastNameLabel||"",disabled:k}),s.createElement(o.E,{value:null==(r=y.lastName)?void 0:r.message})),w.fullName&&s.createElement(s.Fragment,null,s.createElement(i.S,{size:"xlarge"}),s.createElement(i.I,{register:function(){return x("fullName","boolean"===typeof w.fullName?{}:w.fullName)},label:h.newFullNameLabel||"",disabled:k}),s.createElement(o.E,{value:null==(a=y.fullName)?void 0:a.message})),w.dateOfBirth&&s.createElement(s.Fragment,null,s.createElement(i.S,{size:"xlarge"}),s.createElement(i.I,{type:"date",register:function(){return x("dateOfBirth","boolean"===typeof w.dateOfBirth?{}:w.dateOfBirth)},label:h.newDateOfBirthLabel||"",disabled:k,style:{overflow:"hidden"}}),s.createElement(o.E,{value:null==(c=y.dateOfBirth)?void 0:c.message})),w.gender&&s.createElement(s.Fragment,null,s.createElement(i.S,{size:"xlarge"}),s.createElement(E,{register:function(){return x("gender","boolean"===typeof w.gender?{}:w.gender)},disabled:k}),s.createElement(o.E,{value:null==(d=y.gender)?void 0:d.message})),w.phoneNumber&&s.createElement(s.Fragment,null,s.createElement(i.S,{size:"xlarge"}),s.createElement(i.I,{type:"tel",label:h.newPhoneNumberLabel||"",register:function(){return x("phoneNumber","boolean"===typeof w.phoneNumber?{}:w.phoneNumber)},disabled:k}),s.createElement(o.E,{value:null==(p=y.phoneNumber)?void 0:p.message})),s.createElement(i.S,{size:"xlarge"}),s.createElement(i.P,{register:function(){return x("password",B)},label:h.newPasswordLabel,autoComplete:"new-password",disabled:k}),s.createElement(o.E,{value:null==(g=y.password)?void 0:g.message}),s.createElement(i.S,{size:"xlarge"}),s.createElement(i.P,{register:function(){return x("passwordConfirm",B)},label:h.confirmNewPasswordLabel,autoComplete:"new-password",disabled:k}),s.createElement(o.E,{value:null==(f=y.passwordConfirm)?void 0:f.message}),s.createElement(i.S,{size:"xlarge"}),s.createElement(i.a,{disabled:k},h.signUpSubmitButton),s.createElement(i.b,{onClick:function(e){return b("SignIn")},disabled:k},h.backToSignIn))}}}]);
//# sourceMappingURL=986.9a4dc472.chunk.js.map