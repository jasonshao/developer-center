export type QuickstartStep = {
  title: string;
  detail: string;
};

export type DirectLink = {
  label: string;
  href: string;
  type: "quickstart" | "api" | "faq" | "acceptance";
};

export type RouteEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  audience: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  directLinks: DirectLink[];
  quickstartSteps: QuickstartStep[];
};

export const primaryRoutes: RouteEntry[] = [
  {
    slug: "offline-store-payments",
    title: "线下门店收款",
    shortDescription: "适合 POS、收银台、扫码设备和门店服务商的线下交易场景。",
    audience: "门店 SaaS、POS 服务商、收银集成团队",
    primaryKeywords: ["B扫C", "C扫B-PRO", "C扫B-预下单", "刷脸支付"],
    secondaryKeywords: [],
    directLinks: [
      {
        label: "线下收款 Quickstart",
        href: "/routes/offline-store-payments",
        type: "quickstart"
      },
      { label: "B扫C 验收文档", href: "#acceptance-bscan-c", type: "acceptance" },
      { label: "线下收款 FAQ", href: "#faq-offline", type: "faq" }
    ],
    quickstartSteps: [
      {
        title: "判断门店场景",
        detail: "先判断设备形态与收银链路，再选择 B扫C、C扫B 或刷脸支付。"
      },
      { title: "准备参数与密钥", detail: "确认商户参数、签名材料与回调地址。" },
      {
        title: "跑通第一笔交易",
        detail: "优先完成最小下单和支付成功回调链路。"
      },
      {
        title: "进入验收上线",
        detail: "联调完成后进入验收文档和错误排查。"
      }
    ]
  },
  {
    slug: "online-mobile-payments",
    title: "线上与移动端支付",
    shortDescription: "适合 App、公众号和 H5 等线上支付接入场景。",
    audience: "线上交易平台、移动应用团队、公众号服务商",
    primaryKeywords: ["App支付", "公众号支付", "手机浏览器H5"],
    secondaryKeywords: ["微信/支付宝内H5"],
    directLinks: [
      {
        label: "线上支付 Quickstart",
        href: "/routes/online-mobile-payments",
        type: "quickstart"
      },
      { label: "公众号支付说明", href: "#wechat-official", type: "api" },
      { label: "线上支付 FAQ", href: "#faq-online", type: "faq" }
    ],
    quickstartSteps: [
      {
        title: "判断终端入口",
        detail: "先区分 App、公众号和浏览器 H5，避免误选支付链路。"
      },
      { title: "完成接入准备", detail: "准备账号能力、密钥和支付回调处理。" },
      {
        title: "跑通交易链路",
        detail: "完成首笔线上交易与回调确认。"
      },
      {
        title: "处理历史兼容方案",
        detail: "对微信/支付宝内 H5 仅展示兼容说明与替代建议。"
      }
    ]
  },
  {
    slug: "mini-program-payments",
    title: "小程序支付",
    shortDescription: "适合小程序主链路、插件模式、B2B 和微企付等场景。",
    audience: "小程序 SaaS、插件服务商、B2B 场景团队",
    primaryKeywords: ["小程序支付", "小程序插件", "小程序B2B支付", "小程序微企付"],
    secondaryKeywords: [],
    directLinks: [
      {
        label: "小程序支付 Quickstart",
        href: "/routes/mini-program-payments",
        type: "quickstart"
      },
      { label: "小程序支付 FAQ", href: "#faq-mini-program", type: "faq" },
      {
        label: "小程序验收文档",
        href: "#acceptance-mini-program",
        type: "acceptance"
      }
    ],
    quickstartSteps: [
      {
        title: "判断小程序模式",
        detail: "区分主小程序、插件模式和 B2B/微企付类型。"
      },
      {
        title: "准备接入配置",
        detail: "整理支付主体、密钥、回调和业务参数。"
      },
      { title: "完成首笔支付", detail: "跑通最小支付链路并验证回调。" },
      {
        title: "进入验收清单",
        detail: "切到验收文档和常见问题进行联调收尾。"
      }
    ]
  },
  {
    slug: "merchant-onboarding-and-settlement",
    title: "商户入网与分账",
    shortDescription: "适合平台型 ISV 的开户、交易和收付通能力接入。",
    audience: "平台型 ISV、连锁 SaaS、分账场景团队",
    primaryKeywords: ["收付通开户", "收付通交易"],
    secondaryKeywords: ["商户入网", "分账"],
    directLinks: [
      {
        label: "入网与分账 Quickstart",
        href: "/routes/merchant-onboarding-and-settlement",
        type: "quickstart"
      },
      { label: "收付通开户说明", href: "#settlement-onboarding", type: "api" },
      { label: "收付通常见问题", href: "#faq-settlement", type: "faq" }
    ],
    quickstartSteps: [
      {
        title: "确认平台角色",
        detail: "先确认是否需要开户、交易管理和平台结算能力。"
      },
      {
        title: "整理开户材料",
        detail: "准备商户入网材料和平台侧配置。"
      },
      {
        title: "验证交易能力",
        detail: "完成交易与结算相关最小链路验证。"
      },
      {
        title: "进入上线检查",
        detail: "结合 FAQ 和验收材料完成上线前核对。"
      }
    ]
  },
  {
    slug: "open-capabilities-and-notifications",
    title: "开放能力与通知",
    shortDescription: "适合事件通知、回调签名和智慧门店开放能力接入。",
    audience: "平台开放团队、通知处理团队、扩展能力集成方",
    primaryKeywords: ["交易事件通知", "回调签名", "智慧门店开放平台"],
    secondaryKeywords: [],
    directLinks: [
      {
        label: "开放能力 Quickstart",
        href: "/routes/open-capabilities-and-notifications",
        type: "quickstart"
      },
      { label: "事件通知说明", href: "#events", type: "api" },
      { label: "回调签名说明", href: "#callback-signature", type: "api" }
    ],
    quickstartSteps: [
      {
        title: "判断扩展能力",
        detail: "确认需要通知、签名还是智慧门店开放能力。"
      },
      {
        title: "准备接收链路",
        detail: "完成回调地址、签名校验和事件消费准备。"
      },
      {
        title: "验证通知处理",
        detail: "跑通一条通知接收和校验链路。"
      },
      {
        title: "进入能力扩展",
        detail: "继续查看开放平台能力和相关支持文档。"
      }
    ]
  }
];
