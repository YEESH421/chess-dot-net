"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/board.js":
/*!*****************************!*\
  !*** ./components/board.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Board; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./square */ \"./components/square.js\");\n/* harmony import */ var _board_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board.module.css */ \"./components/board.module.css\");\n/* harmony import */ var _board_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_board_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst vertical = [\n    1,\n    2,\n    3,\n    4,\n    5,\n    6,\n    7,\n    8\n];\nconst horizontal = [\n    \"a\",\n    \"b\",\n    \"c\",\n    \"d\",\n    \"e\",\n    \"f\",\n    \"g\",\n    \"h\"\n];\nfunction determinePiece(num, letter) {\n    let piece = null;\n    if (num == 2) {\n        piece = \"w_pawn\";\n    } else if (num == 7) {\n        piece = \"b_pawn\";\n    } else if (letter == \"e\") {\n        if (num == 1) {\n            piece = \"w_king\";\n        } else if (num == 8) {\n            piece = \"b_king\";\n        }\n    } else if (letter == \"d\") {\n        if (num == 1) {\n            piece = \"w_queen\";\n        } else {\n            piece = \"b_queen\";\n        }\n    }\n    return piece;\n}\nfunction Board(props) {\n    let squares = [];\n    for(let i = vertical.length - 1; i >= 0; i--){\n        let lightColor = i % 2 == 0 ? true : false;\n        for(let j = 0; j < horizontal.length; j++){\n            let piece = determinePiece(vertical[i], horizontal[j]);\n            squares.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_square__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                piece: piece,\n                coordinate: horizontal[j] + vertical[i],\n                lightColor: lightColor\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\yEEsh\\\\Desktop\\\\Github\\\\chess-dot-net\\\\components\\\\board.js\",\n                lineNumber: 35,\n                columnNumber: 13\n            }, this));\n            lightColor = !lightColor;\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().chessboard),\n        children: squares\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\yEEsh\\\\Desktop\\\\Github\\\\chess-dot-net\\\\components\\\\board.js\",\n        lineNumber: 41,\n        columnNumber: 9\n    }, this);\n}\n_c = Board;\nvar _c;\n$RefreshReg$(_c, \"Board\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2JvYXJkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBOEI7QUFDUztBQUV2QyxNQUFNRSxXQUFXO0lBQUM7SUFBRztJQUFHO0lBQUc7SUFBRztJQUFHO0lBQUc7SUFBRztDQUFFO0FBQ3pDLE1BQU1DLGFBQWE7SUFBQztJQUFLO0lBQUs7SUFBSztJQUFLO0lBQUs7SUFBSztJQUFLO0NBQUk7QUFFM0QsU0FBU0MsZUFBZUMsR0FBRyxFQUFDQyxNQUFNLEVBQUM7SUFDL0IsSUFBSUMsUUFBUSxJQUFJO0lBQ2hCLElBQUdGLE9BQU8sR0FBRTtRQUNSRSxRQUFRO0lBQ1osT0FBTSxJQUFHRixPQUFPLEdBQUU7UUFDZEUsUUFBUTtJQUNaLE9BQU0sSUFBR0QsVUFBVSxLQUFJO1FBQ25CLElBQUdELE9BQU8sR0FBRTtZQUNSRSxRQUFRO1FBQ1osT0FBTSxJQUFHRixPQUFPLEdBQUU7WUFDZEUsUUFBUTtRQUNaLENBQUM7SUFDTCxPQUFNLElBQUdELFVBQVUsS0FBSTtRQUNuQixJQUFHRCxPQUFPLEdBQUU7WUFDUkUsUUFBUTtRQUNaLE9BQUs7WUFDREEsUUFBUTtRQUNaLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBT0E7QUFDWDtBQUNlLFNBQVNDLE1BQU1DLEtBQUssRUFBRTtJQUNqQyxJQUFJQyxVQUFVLEVBQUU7SUFDaEIsSUFBSyxJQUFJQyxJQUFJVCxTQUFTVSxNQUFNLEdBQUcsR0FBR0QsS0FBSyxHQUFHQSxJQUFLO1FBQzNDLElBQUlFLGFBQWFGLElBQUksS0FBSyxJQUFJLElBQUksR0FBRSxLQUFLO1FBQ3pDLElBQUssSUFBSUcsSUFBSSxHQUFHQSxJQUFJWCxXQUFXUyxNQUFNLEVBQUVFLElBQUs7WUFDeEMsSUFBSVAsUUFBUUgsZUFBZUYsUUFBUSxDQUFDUyxFQUFFLEVBQUNSLFVBQVUsQ0FBQ1csRUFBRTtZQUNwREosUUFBUUssSUFBSSxlQUNaLDhEQUFDZiwrQ0FBTUE7Z0JBQUNPLE9BQU9BO2dCQUFPUyxZQUFZYixVQUFVLENBQUNXLEVBQUUsR0FBQ1osUUFBUSxDQUFDUyxFQUFFO2dCQUFDRSxZQUFZQTs7Ozs7O1lBRXhFQSxhQUFhLENBQUNBO1FBQ2xCO0lBQ0o7SUFDQSxxQkFDSSw4REFBQ0k7UUFBSUMsV0FBV2pCLHFFQUFpQjtrQkFDNUJTOzs7Ozs7QUFHYixDQUFDO0tBakJ1QkYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9ib2FyZC5qcz85ZWU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTcXVhcmUgZnJvbSBcIi4vc3F1YXJlXCI7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9ib2FyZC5tb2R1bGUuY3NzJ1xyXG5cclxuY29uc3QgdmVydGljYWwgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOF1cclxuY29uc3QgaG9yaXpvbnRhbCA9IFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZycsICdoJ11cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZVBpZWNlKG51bSxsZXR0ZXIpe1xyXG4gICAgbGV0IHBpZWNlID0gbnVsbFxyXG4gICAgaWYobnVtID09IDIpe1xyXG4gICAgICAgIHBpZWNlID0gJ3dfcGF3bidcclxuICAgIH1lbHNlIGlmKG51bSA9PSA3KXtcclxuICAgICAgICBwaWVjZSA9ICdiX3Bhd24nXHJcbiAgICB9ZWxzZSBpZihsZXR0ZXIgPT0gJ2UnKXtcclxuICAgICAgICBpZihudW0gPT0gMSl7XHJcbiAgICAgICAgICAgIHBpZWNlID0gJ3dfa2luZydcclxuICAgICAgICB9ZWxzZSBpZihudW0gPT0gOCl7XHJcbiAgICAgICAgICAgIHBpZWNlID0gJ2Jfa2luZydcclxuICAgICAgICB9XHJcbiAgICB9ZWxzZSBpZihsZXR0ZXIgPT0gJ2QnKXtcclxuICAgICAgICBpZihudW0gPT0gMSl7XHJcbiAgICAgICAgICAgIHBpZWNlID0gJ3dfcXVlZW4nXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBpZWNlID0gJ2JfcXVlZW4nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBpZWNlXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQm9hcmQocHJvcHMpIHtcclxuICAgIGxldCBzcXVhcmVzID0gW11cclxuICAgIGZvciAobGV0IGkgPSB2ZXJ0aWNhbC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIGxldCBsaWdodENvbG9yID0gaSAlIDIgPT0gMCA/IHRydWUgOmZhbHNlXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBob3Jpem9udGFsLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBwaWVjZSA9IGRldGVybWluZVBpZWNlKHZlcnRpY2FsW2ldLGhvcml6b250YWxbal0pXHJcbiAgICAgICAgICAgIHNxdWFyZXMucHVzaChcclxuICAgICAgICAgICAgPFNxdWFyZSBwaWVjZT17cGllY2V9IGNvb3JkaW5hdGU9e2hvcml6b250YWxbal0rdmVydGljYWxbaV19bGlnaHRDb2xvcj17bGlnaHRDb2xvcn0+XHJcbiAgICAgICAgICAgIDwvU3F1YXJlPilcclxuICAgICAgICAgICAgbGlnaHRDb2xvciA9ICFsaWdodENvbG9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNoZXNzYm9hcmR9PlxyXG4gICAgICAgICAgICB7c3F1YXJlc31cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSJdLCJuYW1lcyI6WyJTcXVhcmUiLCJzdHlsZXMiLCJ2ZXJ0aWNhbCIsImhvcml6b250YWwiLCJkZXRlcm1pbmVQaWVjZSIsIm51bSIsImxldHRlciIsInBpZWNlIiwiQm9hcmQiLCJwcm9wcyIsInNxdWFyZXMiLCJpIiwibGVuZ3RoIiwibGlnaHRDb2xvciIsImoiLCJwdXNoIiwiY29vcmRpbmF0ZSIsImRpdiIsImNsYXNzTmFtZSIsImNoZXNzYm9hcmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/board.js\n"));

/***/ })

});