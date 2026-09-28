export const SCENARIOS = [
  {
    id: 'mining',
    titleEn: 'Dhanbad Underground Coal Mine',
    titleHi: 'धनबाद भूमिगत कोयला खदान',
    regionEn: 'Jharia Coalfield, Dhanbad, Jharkhand',
    regionHi: 'झरिया कोलफील्ड, धनबाद, झारखंड',
    sectorEn: 'Underground Mining & Minerals',
    sectorHi: 'भूमिगत खनन एवं खनिज',
    icon: 'Hammer',
    themeColor: '#f59e0b',
    descriptionEn: 'Enter an active Level-3 bord & pillar underground coal seam. Trainees must inspect the working face, detect structural roof weaknesses, PPE violations, methane accumulation, and live cable hazards.',
    descriptionHi: 'लेवल-3 बोर्ड और पिलर भूमिगत कोयला सीम में प्रवेश करें। प्रशिक्षुओं को काम के चेहरे का निरीक्षण करना होगा, छत की कमजोरी, पीपीई उल्लंघन, मीथेन गैस और लाइव केबल खतरों की पहचान करनी होगी।',
    regulatoryAuthorityEn: 'DGMS (Directorate General of Mines Safety), Dhanbad',
    regulatoryAuthorityHi: 'खान सुरक्षा महानिदेशालय (DGMS), धनबाद',
    hazards: [
      {
        id: 'h_helmet',
        meshName: 'hazard_miner_no_helmet',
        nameEn: 'Worker Missing DGMS Safety Helmet & Cap Lamp',
        nameHi: 'श्रमिक ने सुरक्षा हेलमेट और कैप लैंप नहीं पहना है',
        category: 'PPE Safety',
        severity: 'Critical',
        position: [-1.2, 1.4, 0.4],
        explanationEn: 'Underground miners must wear DGMS-approved composite hard hats with fixed rechargeable cap lamps at all times. Falling coal chips or rock fragments from the strata can cause fatal head trauma.',
        explanationHi: 'भूमिगत खनिकों को हर समय डीजीएमएस-स्वीकृत हार्ड हैट और कैप लैंप पहनना अनिवार्य है। छत से गिरने वाले कोयले या पत्थर के टुकड़े जानलेवा चोट पहुंचा सकते हैं।',
        regulationEn: 'Coal Mines Regulations (CMR) 2017 - Regulation 228 (Protective Footwear & Hard Hats)',
        regulationHi: 'कोयला खान विनियम (CMR) 2017 - विनियम 228 (सुरक्षात्मक उपकरण)',
        correctActionEn: 'Issue mandatory PPE immediately and prohibit entry to the working district until properly equipped.',
        correctActionHi: 'तुरंत अनिवार्य पीपीई प्रदान करें और उपकरण पूरा होने तक कार्य क्षेत्र में प्रवेश रोकें।',
        points: 25
      },
      {
        id: 'h_roof',
        meshName: 'hazard_roof_fracture',
        nameEn: 'Fractured Roof Strata Without Support Props',
        nameHi: 'छत में दरारें और कोई सपोर्ट प्रोप नहीं',
        category: 'Strata / Structural',
        severity: 'Critical',
        position: [0.3, 2.7, -1.0],
        explanationEn: 'Visible longitudinal tension cracks in the shale roof layer without steel roof bolts or wooden cross-bars. Fall of roof is the leading cause of underground mining fatalities in Jharkhand.',
        explanationHi: 'शेल छत की परत में दरारें हैं और कोई स्टील रूफ बोल्ट या लकड़ी के प्रॉप्स नहीं लगे हैं। झारखंड में छत का गिरना खदान मौतों का सबसे बड़ा कारण है।',
        regulationEn: 'CMR 2017 - Regulation 123 (Strata Control and Support Plan - SCAMP)',
        regulationHi: 'CMR 2017 - विनियम 123 (स्ट्रैटा नियंत्रण और समर्थन योजना)',
        correctActionEn: 'Halt work immediately, cordon off the span, and install hydraulic props and roof bolts per SCAMP guidelines.',
        correctActionHi: 'काम तुरंत रोकें, क्षेत्र को सील करें और SCAMP दिशा-निर्देशों के अनुसार हाइड्रोलिक प्रॉप्स लगाएं।',
        points: 25
      },
      {
        id: 'h_methane',
        meshName: 'hazard_vent_duct',
        nameEn: 'Methane (CH4) Accumulation & Disconnected Vent Duct',
        nameHi: 'मीथेन (CH4) गैस जमाव और वेंटिलेशन डक्ट डिस्कनेक्ट',
        category: 'Gas / Explosion',
        severity: 'Critical',
        position: [2.1, 2.2, -0.6],
        explanationEn: 'Auxiliary flexible ventilation duct is torn and loose. Methane emitted from virgin coal faces cannot disperse, creating an explosive mixture between 5% - 15% air volume.',
        explanationHi: 'सहायक वेंटिलेशन डक्ट फटा और ढीला है। ताजा कोयले के चेहरे से निकलने वाली मीथेन गैस बाहर नहीं निकल पा रही, जिससे 5%-15% पर विस्फोट का खतरा बनता है।',
        regulationEn: 'CMR 2017 - Regulation 153 (Standards of Ventilation & Incombustible Dust)',
        regulationHi: 'CMR 2017 - विनियम 153 (वेंटिलेशन के मानक और सुरक्षा)',
        correctActionEn: 'Perform methanometer test with certified flame safety lamp, reconnect auxiliary ducting, and purge dead ends.',
        correctActionHi: 'सत्यापित मिथेनोमीटर से जांच करें, डक्ट को दोबारा जोड़ें और वेंटिलेशन तुरंत चालू करें।',
        points: 25
      },
      {
        id: 'h_cable',
        meshName: 'hazard_water_cable',
        nameEn: '3.3kV Trailing Cable Submerged in Standing Water',
        nameHi: 'पानी के पोखर में डूबी 3.3kV उच्च वोल्टेज केबल',
        category: 'Electrical Safety',
        severity: 'High',
        position: [-0.4, 0.1, 1.2],
        explanationEn: 'A high-voltage continuous miner trailing cable with frayed outer sheath is lying in deep mine drain water. This creates an extreme risk of phase-to-ground shock and spark ignition.',
        explanationHi: 'कट-फटी बाहरी आवरण वाली हाई-वोल्टेज केबल खदान के पानी में डूबी है। इससे घातक करंट लगने और चिंगारी से गैस विस्फोट का खतरा है।',
        regulationEn: 'Central Electricity Authority (Measures Relating to Safety in Mines) Regulations 2010',
        regulationHi: 'केंद्रीय विद्युत प्राधिकरण (खानों में सुरक्षा) विनियम 2010',
        correctActionEn: 'De-energize circuit at gate-end box, hoist cable onto wooden slings on side-wall out of water.',
        correctActionHi: 'गेट-एंड बॉक्स से बिजली बंद करें और केबल को पानी से निकालकर दीवार पर लकड़ी के हैंगर पर टांगें।',
        points: 25
      }
    ],
    decisionDilemma: {
      titleEn: 'Emergency Dilemma: Gas Alarm Spike at Coal Face',
      titleHi: 'आपातकालीन निर्णय: कोयला फेस पर मीथेन गैस अलार्म',
      situationEn: 'During continuous coal cutting, the portable Multi-Gas detector emits a rapid pulsing buzzer: Methane is detected at 1.9% and rising. A nearby trailing cable is crackling with static sparks!',
      situationHi: 'कोयला काटने के दौरान मल्टी-गैस डिटेक्टर से तेज अलार्म बजता है: मीथेन 1.9% पाई गई है और तेजी से बढ़ रही है। पास की केबल से चिंगारियां निकल रही हैं!',
      timerSeconds: 30,
      options: [
        {
          id: 'opt_1',
          textEn: 'Sound immediate whistle, de-energize the section feeder switch, and evacuate all miners towards the main intake airway.',
          textHi: 'तुरंत सीटी बजाएं, सेक्शन का मुख्य पावर स्विच बंद करें और सभी श्रमिकों को ताजी हवा के मार्ग की ओर बाहर निकालें।',
          isCorrect: true,
          scoreDelta: 50,
          consequenceEn: 'Perfect execution! Cutting power prevents spark ignition of explosive air-methane mixture, saving the entire district.',
          consequenceHi: 'शानदार निर्णय! बिजली काटने से गैस में चिंगारी नहीं लगी और सभी खनिक सुरक्षित बाहर निकल गए।',
          audioCue: 'chime'
        },
        {
          id: 'opt_2',
          textEn: 'Grab electrical insulation tape to wrap the sparking cable while shouting to keep the cutters running.',
          textHi: 'काटने की मशीन चलने दें और चिंगारी वाली केबल पर जल्दी से इंसुलेशन टेप लपेटने की कोशिश करें।',
          isCorrect: false,
          scoreDelta: -40,
          consequenceEn: 'Catastrophic Error! Touching a sparking 3.3kV cable in a rising methane atmosphere can trigger a massive coal dust explosion.',
          consequenceHi: 'घातक गलती! मीथेन गैस के माहौल में स्पार्किंग केबल को छूना भयानक विस्फोट का कारण बन सकता है।',
          audioCue: 'error'
        },
        {
          id: 'opt_3',
          textEn: 'Silence the detector buzzer and wait 10 minutes to verify if the gas naturally disperses.',
          textHi: 'डिटेक्टर का अलार्म बंद कर दें और 10 मिनट इंतजार करें कि क्या गैस खुद निकल जाएगी।',
          isCorrect: false,
          scoreDelta: -50,
          consequenceEn: 'Fatal Negligence! DGMS strictly mandates complete withdrawal of men if inflammable gas exceeds 1.25%.',
          consequenceHi: 'गंभीर लापरवाही! DGMS नियमों के अनुसार गैस 1.25% पार करते ही तुरंत काम रोकना अनिवार्य है।',
          audioCue: 'error'
        }
      ]
    },
    quizQuestions: [
      {
        questionEn: 'According to DGMS regulations, what is the maximum permissible methane (CH4) level allowed in the return airway of an underground coal mine?',
        questionHi: 'DGMS नियमों के अनुसार भूमिगत कोयला खदान की रिटर्न एयरवे में मीथेन (CH4) का अधिकतम अनुमेय स्तर क्या है?',
        options: ['0.75%', '1.25%', '2.50%', '5.00%'],
        correctIndex: 0,
        explanationEn: 'Regulation 153 states that methane in the return airway shall not exceed 0.75% and in any working place shall not exceed 1.25%.'
      },
      {
        questionEn: 'What is the primary function of a "Roof Bolt" in underground coal mines?',
        questionHi: 'भूमिगत कोयला खदानों में "रूफ बोल्ट" का मुख्य कार्य क्या है?',
        options: [
          'To anchor electrical cables overhead',
          'To bind layered sedimentary rock strata together into a solid beam to prevent roof collapse',
          'To measure humidity in the mine tunnel',
          'To guide mining carts along the tracks'
        ],
        correctIndex: 1,
        explanationEn: 'Roof bolting clamps weak rock laminations together to form a self-supporting composite beam preventing strata fall.'
      },
      {
        questionEn: 'Why must miners never carry synthetic clothing (like nylon) underground in gassy mines?',
        questionHi: 'खनिकों को गैस वाली खदानों में नायलॉन जैसे सिंथेटिक कपड़े पहनने की मनाही क्यों होती है?',
        options: [
          'They tear too easily on sharp rocks',
          'They generate static electricity friction sparks that can ignite methane/coal dust clouds',
          'They do not absorb sweat properly',
          'They interfere with radio signals'
        ],
        correctIndex: 1,
        explanationEn: 'Friction between synthetic fabrics produces electrostatic discharges (sparks) capable of igniting explosive methane mixtures.'
      },
      {
        questionEn: 'If a miner finds a ventilation door left open in an underground district, what must they do?',
        questionHi: 'यदि कोई खनिक भूमिगत क्षेत्र में वेंटिलेशन दरवाजा खुला पाता है, तो उसे क्या करना चाहिए?',
        options: [
          'Leave it open so more air gets in',
          'Close it immediately, as open doors short-circuit the mine ventilation circuit',
          'Ignore it and report it at the end of the shift',
          'Prop it open with a wooden wedge'
        ],
        correctIndex: 1,
        explanationEn: 'Ventilation doors prevent intake fresh air from leaking directly into returns. Leaving them open suffocates working faces.'
      }
    ]
  },
  {
    id: 'manufacturing',
    titleEn: 'Bokaro Steel Heavy Manufacturing Plant',
    titleHi: 'बोकारो स्टील भारी विनिर्माण संयंत्र',
    regionEn: 'Bokaro Steel City, Jharkhand',
    regionHi: 'बोकारो स्टील सिटी, झारखंड',
    sectorEn: 'Metallurgical & Heavy Manufacturing',
    sectorHi: 'धातुकर्म एवं भारी विनिर्माण',
    icon: 'Factory',
    themeColor: '#3b82f6',
    descriptionEn: 'Inspect a heavy steel rolling and fabrication mill. Identify machine safeguarding breaches, unshielded optical interlocks, high-pressure oil leaks, and overhead liquid metal ladle transport risks.',
    descriptionHi: 'भारी स्टील रोलिंग और निर्माण मिल का निरीक्षण करें। मशीन गार्डिंग उल्लंघन, असुरक्षित ऑप्टिकल इंटरलॉक्स, उच्च दबाव तेल रिसाव और ओवरहेड पिघले धातु लैडल के खतरों को पहचानें।',
    regulatoryAuthorityEn: 'Factories Act 1948 & Jharkhand Factories Rules',
    regulatoryAuthorityHi: 'कारखाना अधिनियम 1948 एवं झारखंड कारखाना नियमावली',
    hazards: [
      {
        id: 'h_crane',
        meshName: 'hazard_overhead_crane',
        nameEn: 'Overhead Molten Steel Ladle Moving Without Exclusion Zone',
        nameHi: 'पिघले स्टील का लैडल क्रेन बिना सुरक्षा घेरे के गतिमान',
        category: 'Machinery / Thermal',
        severity: 'Critical',
        position: [0.0, 3.2, 0.0],
        explanationEn: 'A 150-ton gantry crane carrying 1600°C molten steel is passing overhead without an active warning siren or ground personnel exclusion boundary. Slag splash or mechanical failure is fatal.',
        explanationHi: '1600°C पिघला हुआ स्टील ले जाने वाला 150-टन क्रेन बिना चेतावनी सायरन और बिना ग्राउंड सुरक्षा घेरे के गुजर रहा है। छींटे पड़ने पर तत्काल मृत्यु हो सकती है।',
        regulationEn: 'The Factories Act 1948 - Section 29 (Lifting Machines, Chains, Ropes and Lifting Tackles)',
        regulationHi: 'कारखाना अधिनियम 1948 - धारा 29 (लिफ्टिंग मशीनें और रस्सियां)',
        correctActionEn: 'Activate audible travel siren and enforce a 15-meter ground clearance exclusion zone beneath the hot-metal path.',
        correctActionHi: 'चेतावनी सायरन बजाएं और गर्म धातु मार्ग के नीचे 15 मीटर का ग्राउंड क्लियरेंस सुनिश्चित करें।',
        points: 25
      },
      {
        id: 'h_press',
        meshName: 'hazard_hydraulic_press',
        nameEn: '500-Ton Stamping Press with Bypassed Light Curtain',
        nameHi: '500-टन हाइड्रोलिक प्रेस का सेफ्टी सेंसर बायपास',
        category: 'Machinery Guarding',
        severity: 'Critical',
        position: [-1.8, 1.3, -0.8],
        explanationEn: 'Optical safety light curtains on the hydraulic stamping ram have been taped over by workers to speed up production, completely eliminating anti-pinch operator protection.',
        explanationHi: 'हाइड्रोलिक प्रेस के ऑप्टिकल लाइट कर्टेन सेंसर पर टेप चिपका कर उसे बंद कर दिया गया है। इससे ऑपरेटर के हाथ कुचलने का अत्यधिक खतरा है।',
        regulationEn: 'The Factories Act 1948 - Section 21 (Fencing of Machinery) & IS 13010',
        regulationHi: 'कारखाना अधिनियम 1948 - धारा 21 (मशीनरी की फेंसिंग)',
        correctActionEn: 'Shut down press, remove sensor bypass, test interlock failsafe circuit, and retrain machine operator.',
        correctActionHi: 'प्रेस बंद करें, बायपास हटाएं, इंटरलॉक सर्किट की जांच करें और ऑपरेटर को पुनः प्रशिक्षित करें।',
        points: 25
      },
      {
        id: 'h_loto',
        meshName: 'hazard_loto_panel',
        nameEn: 'Maintenance Work Underway Without Lockout / Tagout (LOTO)',
        nameHi: 'बिना लॉकआउट/टैगआउट (LOTO) के इलेक्ट्रिकल मेंटेनेंस',
        category: 'Electrical Safety',
        severity: 'Critical',
        position: [1.8, 1.2, 0.7],
        explanationEn: 'Electrician is repairing 415V 3-phase busbars inside the motor control center without a padlocked hasp or danger tag on the primary disconnect switch. Another worker could re-energize it!',
        explanationHi: 'मोटर कंट्रोल सेंटर में 415V बसबार पर बिना पैडलॉक और बिना डेंजर टैग लगाए रिपेयरिंग चल रही है। कोई दूसरा व्यक्ति अनजाने में स्विच ऑन कर सकता है।',
        regulationEn: 'OSHA 29 CFR 1910.147 & Indian Electricity Rules 1956 Rule 36',
        regulationHi: 'भारतीय विद्युत नियमावली 1956 नियम 36 (LOTO मानक)',
        correctActionEn: 'Halt work, place personal red safety padlock and signed warning tag on the isolation breaker.',
        correctActionHi: 'काम रोकें, आइसोलेशन ब्रेकर पर व्यक्तिगत लाल सुरक्षा पैडलॉक और हस्ताक्षरित चेतावनी टैग लगाएं।',
        points: 25
      },
      {
        id: 'h_oil',
        meshName: 'hazard_oil_spill',
        nameEn: 'High-Pressure Hydraulic Fluid Slick Near Automated Lathe',
        nameHi: 'मशीन के पास फिसलन भरा हाइड्रोलिक तेल रिसाव',
        category: 'Workplace Safety',
        severity: 'High',
        position: [0.8, 0.05, 1.4],
        explanationEn: 'Pressurized hydraulic line leak created an uncordoned slippery pool across the operator walkway, creating slips, falls into moving rotating chucks, and fire ignition hazards.',
        explanationHi: 'हाइड्रोलिक पाइप फटने से रास्ते में फिसलन भरा तेल फैल गया है। इससे फिसलकर घूमती मशीन में गिरने और आग लगने का गंभीर खतरा है।',
        regulationEn: 'The Factories Act 1948 - Section 32 (Floors, Stairs and Means of Access)',
        regulationHi: 'कारखाना अधिनियम 1948 - धारा 32 (फर्श और सुरक्षित पहुंच के साधन)',
        correctActionEn: 'Place yellow caution cones, apply oil-absorbent granules/sawdust, and tighten flange gasket.',
        correctActionHi: 'पीले चेतावनी कोन लगाएं, तेल सोखने वाला बुरादा डालें और लीक हो रहे फ्लैंज को ठीक करें।',
        points: 25
      }
    ],
    decisionDilemma: {
      titleEn: 'Decision Dilemma: Bypassing Safety Sensor to Meet Production Quota',
      titleHi: 'निर्णय दुविधा: उत्पादन कोटा पूरा करने के लिए सेफ्टी सेंसर बायपास',
      situationEn: 'The shift supervisor tells you: "We are 2 hours behind our Tata Motors supply order. The light curtain keeps tripping on the stamping press. Place a bypass jumper wire on the sensor so we can work faster."',
      situationHi: 'शिफ्ट सुपरवाइजर कहता है: "हम ऑर्डर में 2 घंटे पीछे चल रहे हैं। प्रेस का सेफ्टी सेंसर बार-बार रुक रहा है। सेंसर को बायपास कर दो ताकि तेजी से काम हो सके।"',
      timerSeconds: 25,
      options: [
        {
          id: 'opt_1',
          textEn: 'Firmly refuse to bypass safety guards, invoke "Stop-Work Authority", and report the unsafe instruction to the Plant Safety Manager.',
          textHi: 'सुरक्षा गार्ड बायपास करने से साफ इनकार करें, "स्टॉप-वर्क अधिकार" का प्रयोग करें और सुरक्षा प्रबंधक को सूचित करें।',
          isCorrect: true,
          scoreDelta: 50,
          consequenceEn: 'Exemplary industrial integrity! Bypassing interlocks accounts for over 45% of mechanical hand amputations in Indian factories.',
          consequenceHi: 'सराहनीय निर्णय! सेफ्टी सेंसर बायपास करना भारत की फैक्ट्रियों में 45% हाथ कटने की दुर्घटनाओं का मुख्य कारण है।',
          audioCue: 'chime'
        },
        {
          id: 'opt_2',
          textEn: 'Follow the supervisor\'s order since he is senior and promises to watch your hands while operating.',
          textHi: 'सुपरवाइजर की बात मान लें क्योंकि वह सीनियर हैं और ध्यान रखने का वादा कर रहे हैं।',
          isCorrect: false,
          scoreDelta: -50,
          consequenceEn: 'Severe Violation! Human reaction time (0.25s) is too slow to stop a 500-ton hydraulic ram downward stroke.',
          consequenceHi: 'गंभीर उल्लंघन! 500 टन के हाइड्रोलिक स्ट्रोक को रोकने के लिए मानवीय प्रतिक्रिया समय बहुत धीमा होता है।',
          audioCue: 'error'
        },
        {
          id: 'opt_3',
          textEn: 'Bypass the sensor only for 1 hour to clear the urgent batch, then reconnect it.',
          textHi: 'सिर्फ 1 घंटे के लिए बायपास करें ताकि जरूरी काम निपट जाए, फिर वापस जोड़ दें।',
          isCorrect: false,
          scoreDelta: -40,
          consequenceEn: 'Deadly Compromise! Safety rules have zero tolerance. Accidents happen in fractions of a second.',
          consequenceHi: 'जानलेवा समझौता! सुरक्षा नियमों में कोई ढिलाई नहीं होती। दुर्घटनाएं सेकंड के सौवें हिस्से में होती हैं।',
          audioCue: 'error'
        }
      ]
    },
    quizQuestions: [
      {
        questionEn: 'What does "LOTO" stand for in industrial plant safety?',
        questionHi: 'औद्योगिक संयंत्र सुरक्षा में "LOTO" का पूरा नाम क्या है?',
        options: [
          'Line Optimization & Tactical Operations',
          'Lockout / Tagout (Hazardous Energy Control)',
          'Low Oxygen & Temperature Officer',
          'Load Testing Overhead'
        ],
        correctIndex: 1,
        explanationEn: 'Lockout/Tagout (LOTO) is a safety procedure ensuring that dangerous machines are properly shut off and not restarted prior to the completion of maintenance.'
      },
      {
        questionEn: 'Under the Indian Factories Act 1948 Section 21, what must be done to all moving transmission gear and flywheels?',
        questionHi: 'भारतीय कारखाना अधिनियम 1948 की धारा 21 के तहत सभी गतिशील ट्रांसमिशन गियर के लिए क्या आवश्यक है?',
        options: [
          'They must be painted bright yellow only',
          'They must be securely fenced by safeguards of substantial construction',
          'They can remain open if workers are experienced',
          'They need protection only during night shifts'
        ],
        correctIndex: 1,
        explanationEn: 'Section 21 strictly mandates that every dangerous part of machinery shall be securely fenced while in motion.'
      },
      {
        questionEn: 'What is the required standard color for Industrial Emergency Stop (E-Stop) push buttons and background?',
        questionHi: 'औद्योगिक आपातकालीन स्टॉप (E-Stop) बटन और पृष्ठभूमि का मानक रंग क्या होना चाहिए?',
        options: [
          'Green button with Blue background',
          'Red mushroom-head button with Yellow background',
          'Black button with White background',
          'Orange button with Grey background'
        ],
        correctIndex: 1,
        explanationEn: 'IS/IEC standards specify that Emergency Stop actuators must be red mushroom-type buttons set against a high-contrast yellow background.'
      },
      {
        questionEn: 'When an overhead crane is transporting liquid steel ladle, what is the minimum required safe protocol?',
        questionHi: 'जब ओवरहेड क्रेन पिघला हुआ स्टील ले जा रहा हो, तो न्यूनतम आवश्यक सुरक्षा प्रोटोकॉल क्या है?',
        options: [
          'Workers can walk beneath as long as they wear safety helmets',
          'Audible sirens must sound and no person must ever pass or stand under a suspended load',
          'Move the load as fast as possible to prevent cooling',
          'Operate the crane only when lights are switched off'
        ],
        correctIndex: 1,
        explanationEn: 'Never stand or pass under any suspended load, especially liquid molten steel where ladle trunnion failure is catastrophic.'
      }
    ]
  },
  {
    id: 'emergency',
    titleEn: 'Factory Substation & Chemical Fire Emergency',
    titleHi: 'औद्योगिक सबस्टेशन एवं रासायनिक अग्नि आपातकाल',
    regionEn: 'Industrial Estate Adityapur / Ranchi, Jharkhand',
    regionHi: 'औद्योगिक क्षेत्र आदित्यपुर / रांची, झारखंड',
    sectorEn: 'Industrial Fire & Chemical Emergency',
    sectorHi: 'औद्योगिक अग्नि एवं रासायनिक आपातकाल',
    icon: 'Flame',
    themeColor: '#ef4444',
    descriptionEn: 'An arc-flash explosion has ignited a high-voltage oil transformer and chemical drum storage. Trainees must choose the correct fire suppression tactics, avoid electrical water electrocution, and execute evacuation protocol.',
    descriptionHi: 'एक आर्क-फ्लैश विस्फोट ने हाई-वोल्टेज ऑयल ट्रांसफार्मर और केमिकल ड्रम में आग लगा दी है। सही अग्निशामक चुनें, पानी से करंट लगने से बचें और निकासी प्रोटोकॉल का पालन करें।',
    regulatoryAuthorityEn: 'National Building Code (NBC) Part IV & State Fire Service Act',
    regulatoryAuthorityHi: 'राष्ट्रीय भवन संहिता (NBC) भाग IV एवं अग्निशमन सेवा नियमावली',
    hazards: [
      {
        id: 'h_trans_fire',
        meshName: 'hazard_transformer_fire',
        nameEn: 'Class C / Live Electrical Transformer Fire with Thick Smoke',
        nameHi: 'लाइव इलेक्ट्रिकल ट्रांसफार्मर में क्लास C आग और काला धुआं',
        category: 'Fire / Explosion',
        severity: 'Critical',
        position: [-1.4, 1.8, -0.5],
        explanationEn: '415V electrical switchgear and transformer oil are blazing with intense heat and toxic dielectric fumes. Live voltage is still active on incoming terminal bushings.',
        explanationHi: '415V स्विचगियर और ट्रांसफार्मर ऑयल में भीषण आग लगी है। इनपुट बुशिंग पर अभी भी हाई-वोल्टेज करंट चालू है।',
        regulationEn: 'IS 2190: Selection, Installation and Maintenance of First-Aid Fire Appliances',
        regulationHi: 'IS 2190: प्राथमिक अग्निशमन उपकरणों का चयन और रखरखाव',
        correctActionEn: 'Never use water! Use CO2 or Dry Chemical Powder (DCP) only after de-energizing incoming breaker.',
        correctActionHi: 'पानी कभी न डालें! बिजली बंद करने के बाद केवल CO2 या ड्राई केमिकल पाउडर (DCP) का उपयोग करें।',
        points: 25
      },
      {
        id: 'h_blocked_exit',
        meshName: 'hazard_blocked_exit',
        nameEn: 'Emergency Fire Exit Blocked by Wooden Pallets & Scrap',
        nameHi: 'आपातकालीन निकास द्वार लकड़ी के कबाड़ से बंद है',
        category: 'Workplace Safety',
        severity: 'Critical',
        position: [2.2, 1.2, -1.2],
        explanationEn: 'The designated illuminated escape exit door is barricaded by stacked wooden crates and metal scrap, trapping workers inside during a smoke emergency.',
        explanationHi: 'आपातकालीन निकास द्वार के सामने लकड़ी के बक्से और धातु का कबाड़ रखा है, जिससे आग लगने पर बाहर निकलने का रास्ता बंद है।',
        regulationEn: 'The Factories Act 1948 - Section 38 (Precautions in Case of Fire)',
        regulationHi: 'कारखाना अधिनियम 1948 - धारा 38 (आग के मामले में सावधानियां)',
        correctActionEn: 'Clear all emergency exit passages permanently and maintain uninhibited 2-meter corridor clearance.',
        correctActionHi: 'आपातकालीन रास्तों से सारा सामान तुरंत हटाएं और हमेशा 2 मीटर चौड़ा खुला रास्ता रखें।',
        points: 25
      },
      {
        id: 'h_wrong_extinguisher',
        meshName: 'hazard_wrong_extinguisher',
        nameEn: 'Pressurized Water Extinguisher Placed Next to Electrical Panel',
        nameHi: 'इलेक्ट्रिकल पैनल के पास पानी वाला अग्निशामक रखा होना',
        category: 'Fire Equipment Misplacement',
        severity: 'High',
        position: [0.6, 0.9, 1.2],
        explanationEn: 'Only water-type (Class A) extinguishers are mounted in the substation. If an untrained worker sprays water on an energized 415V arc, the water stream conducts fatal electrical current back to the nozzle.',
        explanationHi: 'सबस्टेशन में पानी वाला सिलिंडर रखा है। यदि कोई चालू बिजली पर पानी छिड़केगा तो करंट पानी की धार के जरिए सीधे हाथ में लगेगा और मौके पर मौत हो जाएगी।',
        regulationEn: 'IS 15683 (Portable Fire Extinguishers Specifications)',
        regulationHi: 'IS 15683 (पोर्टेबल अग्निशामक विनिर्देश)',
        correctActionEn: 'Replace with Carbon Dioxide (CO2) or ABC Dry Chemical Powder extinguishers with yellow/black band.',
        correctActionHi: 'इसे हटाकर कार्बन डाइऑक्साइड (CO2) या ABC ड्राई केमिकल पाउडर अग्निशामक लगाएं।',
        points: 25
      },
      {
        id: 'h_chemical_drums',
        meshName: 'hazard_chemical_drums',
        nameEn: 'Flammable Solvent Drums Stored Directly in Transformer Heat Zone',
        nameHi: 'ज्वलनशील विलायक ड्रम ट्रांसफार्मर की गर्मी में रखे होना',
        category: 'Chemical Hazard',
        severity: 'High',
        position: [1.3, 0.4, -0.2],
        explanationEn: 'Unvented metal drums of industrial degreaser solvent (Flashpoint < 35°C) are sitting within 2 meters of the hot transformer cabinet, risking BLEVE (Boiling Liquid Expanding Vapor Explosion).',
        explanationHi: 'अत्यधिक ज्वलनशील विलायक के ड्रम ट्रांसफार्मर के पास रखे हैं। गर्मी से ड्रम फटकर भयानक रासायनिक आग पैदा कर सकते हैं।',
        regulationEn: 'Manufacture, Storage and Import of Hazardous Chemical Rules 1989',
        regulationHi: 'खतरनाक रासायनिक नियम 1989 (भंडारण और सुरक्षा)',
        correctActionEn: 'Relocate all flammable chemicals to a dedicated ventilated flame-proof bunded storage shed.',
        correctActionHi: 'सभी रसायनों को तुरंत हटाकर सुरक्षित वेंटिलेटेड फ्लेम-प्रूफ स्टोरेज शेड में रखें।',
        points: 25
      }
    ],
    decisionDilemma: {
      titleEn: 'Decision Dilemma: Live Electrical Fire Suppression',
      titleHi: 'निर्णय दुविधा: चालू बिजली की आग बुझाने का सही तरीका',
      situationEn: 'Thick smoke billows from the 415V control cubicle. Flames are licking upward towards the ceiling cable tray. A fellow apprentice grabs a nearby water hose nozzle to spray the fire!',
      situationHi: '415V कंट्रोल पैनल से घना धुआं निकल रहा है और लपटें छत की केबल ट्रे की तरफ बढ़ रही हैं। आपका साथी पास का पानी का पाइप उठाकर आग पर पानी फेंकने जा रहा है!',
      timerSeconds: 20,
      options: [
        {
          id: 'opt_1',
          textEn: 'Shout "STOP!", pull him back, trip the main substation incoming breaker, and deploy a Carbon Dioxide (CO2) extinguisher aimed at the base of the fire.',
          textHi: '"रुको!" चिल्लाकर उसे पीछे खींचें, मुख्य इनकमिंग पावर स्विच बंद करें और आग की जड़ पर CO2 अग्निशामक चलाएं।',
          isCorrect: true,
          scoreDelta: 50,
          consequenceEn: 'Life saved! Water on 415V creates a direct shock path. De-energizing and using non-conductive CO2 is the only safe method.',
          consequenceHi: 'आपने अपने साथी की जान बचाई! चालू बिजली पर पानी फेंकना सीधे करंट का झटका देता। CO2 का प्रयोग 100% सही था।',
          audioCue: 'chime'
        },
        {
          id: 'opt_2',
          textEn: 'Help him aim the high-pressure water jet directly at the sparking terminals to cool them down.',
          textHi: 'पानी के पाइप को दोनों हाथों से पकड़कर स्पार्किंग पैनल पर सीधे तेज धार से पानी छिड़कें।',
          isCorrect: false,
          scoreDelta: -50,
          consequenceEn: 'Lethal Shock! Water column conducts high voltage directly through your body to the ground, causing instantaneous electrocution.',
          consequenceHi: 'घातक करंट! पानी की धार 415 वोल्ट करंट को सीधे शरीर तक पहुंचा देती है, जिससे तुरंत मौत हो जाती है।',
          audioCue: 'error'
        },
        {
          id: 'opt_3',
          textEn: 'Run through the thick ceiling smoke standing tall while holding your breath.',
          textHi: 'सीधे खड़े होकर और सांस रोककर छत के घने धुएं के बीच से भागने की कोशिश करें।',
          isCorrect: false,
          scoreDelta: -40,
          consequenceEn: 'Smoke Inhalation Collapse! Toxic carbon monoxide and superheated gases gather near the ceiling; you must crawl low beneath the smoke layer.',
          consequenceHi: 'धुएं से बेहोशी! जहरीली गैसें छत के पास जमा होती हैं; आपको हमेशा झुककर या घुटनों के बल चलना चाहिए।',
          audioCue: 'error'
        }
      ]
    },
    quizQuestions: [
      {
        questionEn: 'Which type of fire extinguisher is strictly FORBIDDEN for use on energized electrical fires?',
        questionHi: 'चालू बिजली की आग पर किस प्रकार के अग्निशामक का उपयोग सख्त वर्जित है?',
        options: [
          'Water / Foam Type Extinguishers',
          'Carbon Dioxide (CO2) Extinguishers',
          'Dry Chemical Powder (DCP) Extinguishers',
          'Clean Agent Halon Alternative Extinguishers'
        ],
        correctIndex: 0,
        explanationEn: 'Water and aqueous foam solutions conduct electricity and can deliver a fatal electric shock to the operator.'
      },
      {
        questionEn: 'In a room filled with toxic smoke and fumes during an industrial fire, how should you navigate to the exit?',
        questionHi: 'औद्योगिक आग के दौरान जहरीले धुएं से भरे कमरे से निकास द्वार तक कैसे जाना चाहिए?',
        options: [
          'Run as fast as you can while jumping over obstacles',
          'Crawl on hands and knees keeping your head 30 to 60 cm above the floor where clean air remains',
          'Stand on a chair to wave for help out the window',
          'Wait in the corner until the smoke clears naturally'
        ],
        correctIndex: 1,
        explanationEn: 'Heat and toxic fumes rise to the ceiling. Cooler, breathable air stays in a 30-60 cm layer along the floor.'
      },
      {
        questionEn: 'What does the "P.A.S.S." technique stand for when operating a portable fire extinguisher?',
        questionHi: 'पोर्टेबल अग्निशामक चलाते समय "P.A.S.S." तकनीक का क्या अर्थ है?',
        options: [
          'Power, Alert, Shout, Sprint',
          'Pull pin, Aim nozzle, Squeeze handle, Sweep side-to-side',
          'Pump water, Aim high, Spray hard, Stop',
          'Protect, Assess, Secure, Shield'
        ],
        correctIndex: 1,
        explanationEn: 'PASS is the universal firefighting acronym: Pull the safety pin, Aim low at the base of the fire, Squeeze the lever, and Sweep side to side.'
      },
      {
        questionEn: 'What is the minimum frequency for mandatory fire evacuation drills in industrial factories under the Factories Act?',
        questionHi: 'कारखाना अधिनियम के तहत औद्योगिक फैक्ट्रियों में अनिवार्य फायर निकासी अभ्यास (ड्रिल) की न्यूनतम आवृत्ति क्या है?',
        options: [
          'Once every 5 years',
          'At least once every 6 months (twice a year)',
          'Only after an accident occurs',
          'Once a month only for managers'
        ],
        correctIndex: 1,
        explanationEn: 'Statutory rules require industrial factories to conduct fire drills at least once every six months to test alarms and egress readiness.'
      }
    ]
  }
];

export const VOCATIONAL_TRADES = [
  { id: 'mining_tech', nameEn: 'Mining Safety Apprentice (DGMS)', nameHi: 'खनन सुरक्षा प्रशिक्षु (DGMS)' },
  { id: 'fitter_turner', nameEn: 'Industrial Fitter & Machinist', nameHi: 'औद्योगिक फिटर एवं मशीनिस्ट' },
  { id: 'electrician', nameEn: 'High-Voltage Plant Electrician', nameHi: 'उच्च वोल्टेज संयंत्र इलेक्ट्रीशियन' },
  { id: 'welder_fab', nameEn: 'Heavy Fabrication & Welder', nameHi: 'भारी फैब्रिकेशन एवं वेल्डर' },
  { id: 'safety_officer', nameEn: 'Vocational HSE Officer', nameHi: 'व्यावसायिक सुरक्षा अधिकारी' }
];

export const TRAINING_CENTERS = [
  'BCCL Central Training Institute, Dhanbad',
  'Bokaro Steel Plant Vocational Center, SAIL',
  'Tata Steel Technical Institute, Jamshedpur',
  'Government ITI Ranchi, Jharkhand',
  'Central Coalfields Ltd (CCL) Skill Academy, Ramgarh'
];
