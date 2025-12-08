(function(){"use strict";function t(s){return s<=1?s:t(s-1)+t(s-2)}self.onmessage=s=>{const e=s.data,n=t(e);self.postMessage(n)}})();
