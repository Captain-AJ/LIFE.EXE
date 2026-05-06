/* ============================================================
   LIFE.EXE — Real Life Achievement Tracker  v2.0
   script.js  — 601 achievements, upgraded sounds
   All existing localStorage data is fully preserved.
   ============================================================ */

'use strict';

// ─── XP CONFIG ───────────────────────────────────────────────
const XP_VALUES = { common: 50, rare: 150, epic: 400, legendary: 1000 };

function xpForLevel(lvl) {
  return Math.floor(500 * Math.pow(1.35, lvl - 1));
}

// ─── ACHIEVEMENT DATABASE (601 total) ────────────────────────
const ACHIEVEMENTS = [

  // ══════════════════════════════════════════════════════════
  // EARLY LIFE (el01–el40)
  // ══════════════════════════════════════════════════════════
  { id:'el01', cat:'early', icon:'🐣', name:'First Breath',           desc:'Enter the world for the first time.',                          rarity:'common' },
  { id:'el02', cat:'early', icon:'👣', name:'First Steps',            desc:'Take your first steps without falling.',                       rarity:'common' },
  { id:'el03', cat:'early', icon:'🗣️', name:'First Words',            desc:'Utter your first recognizable word.',                          rarity:'common' },
  { id:'el04', cat:'early', icon:'🎂', name:'First Birthday',         desc:'Survive your first full year on Earth.',                       rarity:'common' },
  { id:'el05', cat:'early', icon:'🏫', name:'Day One',                desc:'Survive your first day of school.',                            rarity:'common' },
  { id:'el06', cat:'early', icon:'🚲', name:'No Training Wheels',     desc:'Ride a bike without support for the first time.',              rarity:'common' },
  { id:'el07', cat:'early', icon:'🏊', name:'Don\'t Drown',           desc:'Learn to swim.',                                               rarity:'common' },
  { id:'el08', cat:'early', icon:'🦷', name:'Tooth Fairy Visited',    desc:'Lose your first baby tooth.',                                  rarity:'common' },
  { id:'el09', cat:'early', icon:'🌙', name:'Slumber Party',          desc:'Spend the night away from home for the first time.',           rarity:'common' },
  { id:'el10', cat:'early', icon:'📚', name:'First Chapter Book',     desc:'Read your first full chapter book.',                           rarity:'common' },
  { id:'el11', cat:'early', icon:'🎈', name:'Five Alive',             desc:'Blow out birthday candles successfully at age 5.',             rarity:'common' },
  { id:'el12', cat:'early', icon:'🌳', name:'Tree Climber',           desc:'Climb your first tree.',                                       rarity:'common' },
  { id:'el13', cat:'early', icon:'🎠', name:'Playground Regular',     desc:'Have a favourite spot on the playground.',                     rarity:'common' },
  { id:'el14', cat:'early', icon:'🌈', name:'Crayon Artist',          desc:'Draw a picture that gets put on the fridge.',                  rarity:'common' },
  { id:'el15', cat:'early', icon:'🐾', name:'Pet Keeper',             desc:'Take care of your first pet.',                                 rarity:'common' },
  { id:'el16', cat:'early', icon:'⭐', name:'Gold Star',              desc:'Get a gold star or sticker for good work in class.',           rarity:'common' },
  { id:'el17', cat:'early', icon:'🛝', name:'Recess Champion',        desc:'Win a game at recess against classmates.',                     rarity:'common' },
  { id:'el18', cat:'early', icon:'🎒', name:'Backpack Loaded',        desc:'Pack your own school bag for the first time.',                 rarity:'common' },
  { id:'el19', cat:'early', icon:'🧇', name:'Breakfast Cook',         desc:'Make your own breakfast for the first time.',                  rarity:'common' },
  { id:'el20', cat:'early', icon:'💤', name:'No More Naps',           desc:'Finally stop needing daily naps.',                             rarity:'common' },
  { id:'el21', cat:'early', icon:'📺', name:'Favourite Show',         desc:'Have a favourite TV show you watched every week.',             rarity:'common' },
  { id:'el22', cat:'early', icon:'🏖️', name:'Beach Day',             desc:'Play at the beach for the first time.',                        rarity:'common' },
  { id:'el23', cat:'early', icon:'🌨️', name:'Snowball Warrior',      desc:'Have your first real snowball fight.',                         rarity:'common' },
  { id:'el24', cat:'early', icon:'🔦', name:'Scared of the Dark',     desc:'Sleep with a nightlight and eventually stop needing it.',      rarity:'common' },
  { id:'el25', cat:'early', icon:'🃏', name:'Card Shark Jr.',          desc:'Win your first board game or card game.',                      rarity:'common' },
  { id:'el26', cat:'early', icon:'🎤', name:'School Play',            desc:'Perform in a school play or talent show.',                     rarity:'common' },
  { id:'el27', cat:'early', icon:'📝', name:'First Homework',         desc:'Complete your first homework assignment.',                     rarity:'common' },
  { id:'el28', cat:'early', icon:'🚌', name:'Bus Rider',              desc:'Ride the school bus for the first time.',                      rarity:'common' },
  { id:'el29', cat:'early', icon:'🦸', name:'Halloween Hero',         desc:'Have an epic Halloween costume.',                              rarity:'common' },
  { id:'el30', cat:'early', icon:'🎁', name:'Best Gift Ever',         desc:'Receive a gift that genuinely amazed you as a child.',         rarity:'common' },
  { id:'el31', cat:'early', icon:'🤧', name:'First Cold',             desc:'Survive your first memorable illness.',                        rarity:'common' },
  { id:'el32', cat:'early', icon:'🩹', name:'Bandage Badge',          desc:'Get your first big scrape and wear it proudly.',               rarity:'common' },
  { id:'el33', cat:'early', icon:'🍦', name:'Ice Cream Devotee',      desc:'Have a favourite ice cream flavour and defend it passionately.',rarity:'common' },
  { id:'el34', cat:'early', icon:'🎡', name:'Fair Fanatic',           desc:'Attend a fair or carnival as a child.',                        rarity:'common' },
  { id:'el35', cat:'early', icon:'📖', name:'Library Card',           desc:'Get your first library card.',                                 rarity:'common' },
  { id:'el36', cat:'early', icon:'🌻', name:'Garden Helper',          desc:'Plant your first seed and watch it grow.',                     rarity:'common' },
  { id:'el37', cat:'early', icon:'🤸', name:'First Cartwheel',        desc:'Successfully do a cartwheel.',                                 rarity:'common' },
  { id:'el38', cat:'early', icon:'🐟', name:'Fish Catcher',           desc:'Catch your first fish.',                                       rarity:'common' },
  { id:'el39', cat:'early', icon:'🎂', name:'Decade Complete',        desc:'Turn 10 years old — a full decade on Earth.',                  rarity:'rare'   },
  { id:'el40', cat:'early', icon:'🧸', name:'Old Friend',             desc:'Still have a childhood toy as an adult.',                      rarity:'rare'   },

  // ══════════════════════════════════════════════════════════
  // SOCIAL (so01–so55)
  // ══════════════════════════════════════════════════════════
  { id:'so01', cat:'social', icon:'🤝', name:'First Friend',           desc:'Make your very first real friend.',                            rarity:'common' },
  { id:'so02', cat:'social', icon:'💌', name:'Crushmate',              desc:'Develop your first real crush.',                               rarity:'common' },
  { id:'so03', cat:'social', icon:'💑', name:'Relationship Status',    desc:'Enter your first romantic relationship.',                      rarity:'rare'   },
  { id:'so04', cat:'social', icon:'💔', name:'Heartbreak Hotel',       desc:'Experience heartbreak for the first time.',                    rarity:'rare'   },
  { id:'so05', cat:'social', icon:'💍', name:'Proposer / Proposee',    desc:'Be part of a marriage proposal.',                             rarity:'epic'   },
  { id:'so06', cat:'social', icon:'🥂', name:'Ride or Die',            desc:'Maintain a friendship for 10+ years.',                        rarity:'rare'   },
  { id:'so07', cat:'social', icon:'👯', name:'Squad Goals',            desc:'Have a close group of 4+ friends.',                           rarity:'rare'   },
  { id:'so08', cat:'social', icon:'🎉', name:'Party Host',             desc:'Host a party or gathering at your place.',                     rarity:'common' },
  { id:'so09', cat:'social', icon:'🙏', name:'Forgiven',               desc:'Forgive someone who truly hurt you.',                          rarity:'epic'   },
  { id:'so10', cat:'social', icon:'🌐', name:'International Bond',     desc:'Make a close friend from another country.',                    rarity:'rare'   },
  { id:'so11', cat:'social', icon:'📞', name:'Still Calling',          desc:'Stay in touch with a childhood friend.',                       rarity:'rare'   },
  { id:'so12', cat:'social', icon:'👰', name:'I Do',                   desc:'Get married.',                                                 rarity:'legendary'},
  { id:'so13', cat:'social', icon:'🍻', name:'Wingman',                desc:'Help a friend ask someone out successfully.',                  rarity:'common' },
  { id:'so14', cat:'social', icon:'🖥️', name:'Friends in Odd Places',  desc:'Make a real friend online.',                                  rarity:'rare' },
  { id:'so15', cat:'social', icon:'🤣', name:'Inside Joke Creator',    desc:'Start an inside joke that lasts years.',                       rarity:'common' },
  { id:'so16', cat:'social', icon:'🫂', name:'Surprise Reunion',       desc:'Reunite with someone you lost touch with.',                    rarity:'rare'   },
  { id:'so17', cat:'social', icon:'🏡', name:'Neighbour Friend',       desc:'Become genuinely close friends with a neighbour.',             rarity:'common' },
  { id:'so18', cat:'social', icon:'👶', name:'The Cool Aunt/Uncle',    desc:'Be the cool aunt or uncle to someone.',                        rarity:'rare'   },
  { id:'so19', cat:'social', icon:'🎤', name:'Public Speaker',         desc:'Speak in front of 20+ people.',                               rarity:'rare'   },
  { id:'so20', cat:'social', icon:'🎂', name:'Remembered Birthdays',   desc:'Remember all your close friends\' birthdays without reminders.',rarity:'rare' },
  { id:'so21', cat:'social', icon:'💬', name:'Mediator',               desc:'Successfully resolve a conflict between two other people.',     rarity:'rare'   },
  { id:'so22', cat:'social', icon:'🍽️', name:'Dinner Party Host',     desc:'Host a sit-down dinner party for 6+ people.',                  rarity:'rare'   },
  { id:'so23', cat:'social', icon:'✉️', name:'Pen Pal',               desc:'Exchange letters or messages with someone far away over time.', rarity:'common' },
  { id:'so24', cat:'social', icon:'🛡️', name:'Stood Up For Someone',  desc:'Publicly defend someone being treated unfairly.',              rarity:'rare'   },
  { id:'so25', cat:'social', icon:'🧓', name:'Elder Listener',         desc:'Have a meaningful conversation with someone 50+ years older.', rarity:'common' },
  { id:'so26', cat:'social', icon:'👧', name:'Mentor',                 desc:'Mentor or guide a younger person.',                            rarity:'epic'   },
  { id:'so27', cat:'social', icon:'🌍', name:'Cultural Exchange',      desc:'Learn about another culture from someone who lives it.',        rarity:'common' },
  { id:'so28', cat:'social', icon:'🎊', name:'Surprise Party Planned', desc:'Plan a successful surprise party for someone.',                rarity:'rare'   },
  { id:'so29', cat:'social', icon:'🤲', name:'Community Volunteer',    desc:'Volunteer for a community cause at least once.',               rarity:'common' },
  { id:'so30', cat:'social', icon:'🐕', name:'Dog Friend',             desc:'Befriend a dog that initially didn\'t trust you.',             rarity:'common' },
  { id:'so31', cat:'social', icon:'🚗', name:'Road Trip Crew',         desc:'Go on a road trip with friends.',                              rarity:'rare'   },
  { id:'so32', cat:'social', icon:'🎮', name:'Gaming Buddy',           desc:'Play a multiplayer game with a friend for 5+ hours straight.', rarity:'common' },
  { id:'so33', cat:'social', icon:'🎬', name:'Movie Marathon',         desc:'Watch movies with friends all night long.',                    rarity:'common' },
  { id:'so34', cat:'social', icon:'🗳️', name:'Voted',                 desc:'Vote in a local or national election.',                        rarity:'common' },
  { id:'so35', cat:'social', icon:'🦺', name:'Emergency Contact',      desc:'Be someone\'s listed emergency contact.',                      rarity:'rare'   },
  { id:'so36', cat:'social', icon:'💌', name:'Love Letter Written',    desc:'Write a genuine heartfelt letter to someone.',                 rarity:'rare'   },
  { id:'so37', cat:'social', icon:'🫶', name:'Anonymous Kindness',     desc:'Do something kind for a stranger anonymously.',                rarity:'rare'   },
  { id:'so38', cat:'social', icon:'📸', name:'Group Photo',            desc:'Be in a group photo with 10+ people.',                        rarity:'common' },
  { id:'so39', cat:'social', icon:'🧩', name:'Found Your People',      desc:'Find a group where you truly feel you belong.',                rarity:'epic'   },
  { id:'so40', cat:'social', icon:'🕯️', name:'Grief Support',         desc:'Be present and supportive for someone who lost someone.',      rarity:'epic'   },
  { id:'so41', cat:'social', icon:'🏕️', name:'Camp Friend',           desc:'Make a friend at summer camp.',                                rarity:'common' },
  { id:'so42', cat:'social', icon:'🎯', name:'Accountability Partner', desc:'Hold each other accountable with a friend for a shared goal.', rarity:'rare'   },
  { id:'so43', cat:'social', icon:'🤝', name:'Business Partner',       desc:'Start something with a partner or collaborator.',              rarity:'rare'   },
  { id:'so44', cat:'social', icon:'📱', name:'Social Media Free',      desc:'Go a full week off all social media.',                        rarity:'rare'   },
  { id:'so45', cat:'social', icon:'🚶', name:'Solo Night Out',         desc:'Go out to eat or a bar alone comfortably.',                   rarity:'rare'   },
  { id:'so46', cat:'social', icon:'🌺', name:'Bridesmaid / Groomsman', desc:'Stand in someone\'s wedding party.',                           rarity:'rare'   },
  { id:'so47', cat:'social', icon:'🍷', name:'Dinner Table Debate',    desc:'Have a lively dinner debate without anyone getting upset.',    rarity:'common' },
  { id:'so48', cat:'social', icon:'🎵', name:'Concert Crew',           desc:'Attend a live concert with a group of friends.',              rarity:'common' },
  { id:'so49', cat:'social', icon:'🏆', name:'Lifelong Rival',         desc:'Have a friendly long-term rival who pushes you to improve.',  rarity:'rare'   },
  { id:'so50', cat:'social', icon:'🙌', name:'Thank You Note',         desc:'Send a handwritten thank you note.',                          rarity:'common' },
  { id:'so51', cat:'social', icon:'👴', name:'Grandparent Stories',    desc:'Record or write down a grandparent\'s life stories.',         rarity:'epic'   },
  { id:'so52', cat:'social', icon:'🤗', name:'Hug Healer',             desc:'Give someone a hug that genuinely helped them.',              rarity:'common' },
  { id:'so53', cat:'social', icon:'🎁', name:'Perfect Gift Giver',     desc:'Give someone a gift that left them speechless.',              rarity:'rare'   },
  { id:'so54', cat:'social', icon:'🌟', name:'Inspiration',            desc:'Be told by someone that you inspired them.',                  rarity:'epic'   },
  { id:'so55', cat:'social', icon:'💞', name:'20-Year Friendship',     desc:'Maintain a friendship for 20+ years.',                        rarity:'legendary'},

  // ══════════════════════════════════════════════════════════
  // EDUCATION (ed01–ed40)
  // ══════════════════════════════════════════════════════════
  { id:'ed01', cat:'education', icon:'🎒', name:'Elementary Completed',  desc:'Graduate from elementary school.',                           rarity:'common' },
  { id:'ed02', cat:'education', icon:'📓', name:'Middle Ground',         desc:'Survive middle school.',                                     rarity:'common' },
  { id:'ed03', cat:'education', icon:'🎓', name:'High School Hero',      desc:'Graduate high school.',                                      rarity:'common' },
  { id:'ed04', cat:'education', icon:'🏛️', name:'Freshman Survived',    desc:'Complete your first year of college or university.',         rarity:'rare'   },
  { id:'ed05', cat:'education', icon:'📜', name:'Degree Unlocked',       desc:'Earn a university or college degree.',                       rarity:'epic'   },
  { id:'ed06', cat:'education', icon:'🔬', name:'Master of Something',   desc:'Earn a Master\'s degree.',                                   rarity:'epic'   },
  { id:'ed07', cat:'education', icon:'🧑‍🎓', name:'Doctor in the House', desc:'Earn a PhD or doctorate.',                                   rarity:'legendary'},
  { id:'ed08', cat:'education', icon:'📰', name:'Published',             desc:'Get something you wrote formally published.',                 rarity:'epic'   },
  { id:'ed09', cat:'education', icon:'🏆', name:'Academic Award',        desc:'Win a school or academic award.',                            rarity:'rare'   },
  { id:'ed10', cat:'education', icon:'📖', name:'Lifelong Learner',      desc:'Take an online course after school ends.',                   rarity:'common' },
  { id:'ed11', cat:'education', icon:'🗣️', name:'Honor Roll',            desc:'Achieve straight As for a full term.',                       rarity:'rare'   },
  { id:'ed12', cat:'education', icon:'🏅', name:'Perfect Score',         desc:'Score 100% on a major exam.',                               rarity:'rare'   },
  { id:'ed13', cat:'education', icon:'🧪', name:'Science Fair',          desc:'Enter a science fair project.',                              rarity:'common' },
  { id:'ed14', cat:'education', icon:'📊', name:'Class Presentation',    desc:'Present a project in front of the class.',                   rarity:'common' },
  { id:'ed15', cat:'education', icon:'🗺️', name:'Field Trip',           desc:'Go on an educational field trip.',                           rarity:'common' },
  { id:'ed16', cat:'education', icon:'🧮', name:'Math Whiz',             desc:'Win or place in a math competition.',                        rarity:'rare'   },
  { id:'ed17', cat:'education', icon:'🏫', name:'School Council',        desc:'Run for or serve on student council.',                       rarity:'rare'   },
  { id:'ed18', cat:'education', icon:'📡', name:'STEM Certified',        desc:'Earn a certification in a STEM field.',                      rarity:'rare'   },
  { id:'ed19', cat:'education', icon:'🎤', name:'Debate Team',           desc:'Participate in a formal debate.',                            rarity:'rare'   },
  { id:'ed20', cat:'education', icon:'📚', name:'50 Books',              desc:'Read 50 books in your lifetime.',                            rarity:'rare'   },
  { id:'ed21', cat:'education', icon:'📕', name:'100 Books',             desc:'Read 100 books in your lifetime.',                           rarity:'epic'   },
  { id:'ed22', cat:'education', icon:'🌍', name:'History Buff',          desc:'Visit a historical site or museum 10+ times.',               rarity:'common' },
  { id:'ed23', cat:'education', icon:'🔭', name:'Astronomy Night',       desc:'Spend a night stargazing and learn constellation names.',     rarity:'common' },
  { id:'ed24', cat:'education', icon:'🖊️', name:'Essay Master',          desc:'Write a 2,000+ word essay you\'re genuinely proud of.',      rarity:'rare'   },
  { id:'ed25', cat:'education', icon:'🏛️', name:'Scholarship Earner',   desc:'Earn a scholarship based on merit.',                         rarity:'epic'   },
  { id:'ed26', cat:'education', icon:'🎓', name:'Valedictorian',         desc:'Graduate at the top of your class.',                         rarity:'legendary'},
  { id:'ed27', cat:'education', icon:'🌐', name:'Exchange Student',      desc:'Study abroad or participate in an exchange program.',         rarity:'rare'   },
  { id:'ed28', cat:'education', icon:'🧠', name:'Self-Taught Expert',    desc:'Become genuinely skilled at something through self-teaching.',rarity:'epic'   },
  { id:'ed29', cat:'education', icon:'🗣️', name:'TEDx Speaker',          desc:'Give a TEDx talk or similar public knowledge talk.',          rarity:'legendary'},
  { id:'ed30', cat:'education', icon:'🏗️', name:'Capstone Complete',     desc:'Finish a major final project or capstone.',                  rarity:'rare'   },
  { id:'ed31', cat:'education', icon:'📓', name:'Notebook Hoarder',      desc:'Fill an entire notebook front to back.',                     rarity:'common' },
  { id:'ed32', cat:'education', icon:'🔍', name:'Research Paper',        desc:'Write a research paper cited by others.',                    rarity:'epic'   },
  { id:'ed33', cat:'education', icon:'🧬', name:'Lab Partner',           desc:'Successfully complete a science lab experiment.',            rarity:'common' },
  { id:'ed34', cat:'education', icon:'📐', name:'Technical Diploma',     desc:'Earn a technical or vocational diploma.',                    rarity:'rare'   },
  { id:'ed35', cat:'education', icon:'🌱', name:'Workshop Attendee',     desc:'Attend a professional development workshop.',                rarity:'common' },
  { id:'ed36', cat:'education', icon:'🧑‍🏫', name:'Student Teacher',     desc:'Teach or tutor others in a subject.',                        rarity:'rare'   },
  { id:'ed37', cat:'education', icon:'🎯', name:'Certification Stacker', desc:'Earn 3+ professional certifications.',                       rarity:'epic'   },
  { id:'ed38', cat:'education', icon:'📰', name:'School Paper',          desc:'Write for or edit the school newspaper.',                    rarity:'common' },
  { id:'ed39', cat:'education', icon:'🔐', name:'Hackathon Finisher',    desc:'Complete a hackathon from start to finish.',                 rarity:'rare'   },
  { id:'ed40', cat:'education', icon:'🌟', name:'Teacher\'s Legacy',     desc:'Have a teacher who changed your life and tell them so.',     rarity:'epic'   },

  // ══════════════════════════════════════════════════════════
  // SKILLS (sk01–sk70)
  // ══════════════════════════════════════════════════════════
  { id:'sk01', cat:'skills', icon:'💻', name:'Hello World',            desc:'Write and run your first line of code.',                      rarity:'common' },
  { id:'sk02', cat:'skills', icon:'🚀', name:'Ship It',               desc:'Deploy a real project to the internet.',                      rarity:'rare'   },
  { id:'sk03', cat:'skills', icon:'🍳', name:'Edible Experiment',      desc:'Cook a meal from scratch without a recipe.',                  rarity:'common' },
  { id:'sk04', cat:'skills', icon:'🎂', name:'Cake Mastery',           desc:'Bake a cake that people actually want seconds of.',           rarity:'common' },
  { id:'sk05', cat:'skills', icon:'🎸', name:'First Chord',            desc:'Learn to play an instrument.',                               rarity:'rare'   },
  { id:'sk06', cat:'skills', icon:'🎨', name:'Artist Within',          desc:'Create a piece of visual art you\'re proud of.',             rarity:'common' },
  { id:'sk07', cat:'skills', icon:'✍️', name:'Story Teller',           desc:'Write a short story or poem.',                              rarity:'common' },
  { id:'sk08', cat:'skills', icon:'🌍', name:'Polyglot',               desc:'Learn to hold a conversation in a second language.',         rarity:'epic'   },
  { id:'sk09', cat:'skills', icon:'⚽', name:'Team Player',            desc:'Join and participate in a sports team.',                     rarity:'common' },
  { id:'sk10', cat:'skills', icon:'🏋️', name:'PR Broken',             desc:'Hit a new personal record in any physical activity.',        rarity:'rare'   },
  { id:'sk11', cat:'skills', icon:'🔧', name:'DIY Master',             desc:'Fix something broken at home by yourself.',                  rarity:'common' },
  { id:'sk12', cat:'skills', icon:'🏄', name:'Extreme Dabbler',        desc:'Try an extreme sport at least once.',                        rarity:'rare'   },
  { id:'sk13', cat:'skills', icon:'🚗', name:'Licensed Driver',        desc:'Get your driver\'s license.',                                rarity:'common' },
  { id:'sk14', cat:'skills', icon:'🧘', name:'Inner Stillness',        desc:'Maintain a meditation practice for 30 days.',                rarity:'rare'   },
  { id:'sk15', cat:'skills', icon:'💬', name:'Stack Overflow Helper',  desc:'Answer a question that helps someone else online.',          rarity:'common' },
  { id:'sk16', cat:'skills', icon:'🍜', name:'Noodle Artisan',         desc:'Make pasta or noodles completely from scratch.',             rarity:'common' },
  { id:'sk17', cat:'skills', icon:'🏹', name:'Archer',                 desc:'Hit a bullseye at archery.',                                 rarity:'rare'   },
  { id:'sk18', cat:'skills', icon:'🎭', name:'Improv Night',           desc:'Perform improv comedy in front of an audience.',             rarity:'rare'   },
  { id:'sk19', cat:'skills', icon:'🌿', name:'Green Thumb',            desc:'Keep a plant alive for one full year.',                      rarity:'common' },
  { id:'sk20', cat:'skills', icon:'✂️', name:'DIY Haircut',            desc:'Successfully cut someone\'s hair at home.',                  rarity:'common' },
  { id:'sk21', cat:'skills', icon:'🧵', name:'Seamstress / Tailor',    desc:'Sew or repair clothing by hand.',                           rarity:'common' },
  { id:'sk22', cat:'skills', icon:'🎯', name:'Bullseye',               desc:'Hit a perfect target in any precision sport.',               rarity:'rare'   },
  { id:'sk23', cat:'skills', icon:'🏊', name:'Mile Swimmer',           desc:'Swim one full mile without stopping.',                       rarity:'epic'   },
  { id:'sk24', cat:'skills', icon:'🧗', name:'Rock Climber',           desc:'Complete a rock climbing route outdoors.',                   rarity:'rare'   },
  { id:'sk25', cat:'skills', icon:'🚴', name:'Century Rider',          desc:'Cycle 100km in a single ride.',                             rarity:'epic'   },
  { id:'sk26', cat:'skills', icon:'🎰', name:'Poker Face',             desc:'Win a game of poker with a bluff.',                         rarity:'common' },
  { id:'sk27', cat:'skills', icon:'🏂', name:'Slope Conqueror',        desc:'Ski or snowboard down a black diamond slope.',               rarity:'rare'   },
  { id:'sk28', cat:'skills', icon:'🎻', name:'Orchestra Ready',        desc:'Play an instrument in an ensemble or orchestra.',            rarity:'rare'   },
  { id:'sk29', cat:'skills', icon:'🧠', name:'Memory Palace',          desc:'Memorize a list of 50+ items using a technique.',            rarity:'rare'   },
  { id:'sk30', cat:'skills', icon:'📸', name:'Photo Journalist',       desc:'Tell a story purely through a series of photos.',            rarity:'rare'   },
  { id:'sk31', cat:'skills', icon:'🎙️', name:'Podcast Episode',        desc:'Record and release a podcast episode.',                     rarity:'rare'   },
  { id:'sk32', cat:'skills', icon:'🤸', name:'Yoga Flow',              desc:'Complete a 30-minute yoga session without stopping.',        rarity:'common' },
  { id:'sk33', cat:'skills', icon:'🧪', name:'Home Brewer',            desc:'Brew your own beer, wine, or kombucha from scratch.',        rarity:'rare'   },
  { id:'sk34', cat:'skills', icon:'🗺️', name:'Navigator',             desc:'Navigate somewhere new using only a map and no GPS.',        rarity:'common' },
  { id:'sk35', cat:'skills', icon:'🔩', name:'Car Mechanic',           desc:'Repair or maintain your own car.',                          rarity:'rare'   },
  { id:'sk36', cat:'skills', icon:'🎣', name:'Patience Fisher',        desc:'Catch a fish through patience and skill.',                   rarity:'common' },
  { id:'sk37', cat:'skills', icon:'📐', name:'Woodworker',             desc:'Build something functional out of wood.',                   rarity:'rare'   },
  { id:'sk38', cat:'skills', icon:'🌊', name:'Surfer',                 desc:'Stand up on a surfboard in real waves.',                    rarity:'rare'   },
  { id:'sk39', cat:'skills', icon:'🧩', name:'Puzzle Master',          desc:'Complete a 1,000+ piece puzzle.',                           rarity:'common' },
  { id:'sk40', cat:'skills', icon:'🎲', name:'Strategy King',          desc:'Win a complex strategy board game.',                        rarity:'common' },
  { id:'sk41', cat:'skills', icon:'🖥️', name:'App Builder',            desc:'Build and launch a mobile or web app.',                     rarity:'epic'   },
  { id:'sk42', cat:'skills', icon:'🎬', name:'Video Editor',           desc:'Edit a video that others compliment.',                      rarity:'common' },
  { id:'sk43', cat:'skills', icon:'🌐', name:'Website Live',           desc:'Build and host your own website.',                          rarity:'rare'   },
  { id:'sk44', cat:'skills', icon:'🔑', name:'Open Source Contributor',desc:'Submit a pull request accepted into an open source project.',rarity:'epic'   },
  { id:'sk45', cat:'skills', icon:'🧑‍🍳', name:'Dinner Party Chef',   desc:'Cook a 3-course meal for guests.',                          rarity:'rare'   },
  { id:'sk46', cat:'skills', icon:'🍞', name:'Bread Baker',            desc:'Bake a loaf of bread from scratch.',                        rarity:'common' },
  { id:'sk47', cat:'skills', icon:'🌮', name:'World Kitchen',          desc:'Cook a meal from 10 different world cuisines.',             rarity:'rare'   },
  { id:'sk48', cat:'skills', icon:'🎯', name:'Dart Champion',          desc:'Win a game of darts.',                                      rarity:'common' },
  { id:'sk49', cat:'skills', icon:'🌱', name:'Hunter Gatherer',        desc:'Grow and eat food you grew yourself.',                      rarity:'rare'   },
  { id:'sk50', cat:'skills', icon:'🌡️', name:'First Aid Certified',   desc:'Complete a first aid or CPR certification course.',         rarity:'rare'   },
  { id:'sk51', cat:'skills', icon:'⛵', name:'Sailor',                 desc:'Sail a boat by yourself.',                                  rarity:'rare'   },
  { id:'sk52', cat:'skills', icon:'🎥', name:'Short Film Director',    desc:'Direct a short film with a story and cast.',                rarity:'epic'   },
  { id:'sk53', cat:'skills', icon:'🧲', name:'Electronics Hacker',     desc:'Build a working electronics project.',                      rarity:'rare'   },
  { id:'sk54', cat:'skills', icon:'🏇', name:'Horse Rider',            desc:'Ride a horse independently.',                              rarity:'rare'   },
  { id:'sk55', cat:'skills', icon:'🪂', name:'Skydiver',               desc:'Complete a skydive.',                                       rarity:'epic'   },
  { id:'sk56', cat:'skills', icon:'🤿', name:'Scuba Diver',            desc:'Complete a scuba dive.',                                   rarity:'rare'   },
  { id:'sk57', cat:'skills', icon:'🏆', name:'Tournament Placer',      desc:'Place in the top 3 of any official tournament.',           rarity:'rare'   },
  { id:'sk58', cat:'skills', icon:'🎹', name:'Pianist',                desc:'Learn to play a complete song on piano.',                   rarity:'rare'   },
  { id:'sk59', cat:'skills', icon:'🎺', name:'Brass Player',           desc:'Learn a brass instrument.',                                 rarity:'rare'   },
  { id:'sk60', cat:'skills', icon:'🥁', name:'Drummer',                desc:'Keep a steady beat on a full drum kit.',                    rarity:'rare'   },
  { id:'sk61', cat:'skills', icon:'🌍', name:'Trilingual',             desc:'Speak three languages conversationally.',                   rarity:'legendary'},
  { id:'sk62', cat:'skills', icon:'✍️', name:'Calligrapher',           desc:'Learn calligraphy and write something beautiful.',          rarity:'common' },
  { id:'sk63', cat:'skills', icon:'🥋', name:'Fencer',                 desc:'Try fencing at least once.',                                rarity:'rare'   },
  { id:'sk64', cat:'skills', icon:'🏌️', name:'Golfer',                desc:'Complete 18 holes of golf.',                                rarity:'common' },
  { id:'sk65', cat:'skills', icon:'🤼', name:'Martial Artist',         desc:'Earn a belt in a martial art.',                             rarity:'rare'   },
  { id:'sk66', cat:'skills', icon:'🧭', name:'Orienteer',              desc:'Complete an orienteering course.',                          rarity:'rare'   },
  { id:'sk67', cat:'skills', icon:'🎮', name:'Speedrunner',            desc:'Complete a game faster than your previous best.',           rarity:'common' },
  { id:'sk68', cat:'skills', icon:'💾', name:'Database Designer',      desc:'Design and run your own database.',                         rarity:'rare'   },
  { id:'sk69', cat:'skills', icon:'🤖', name:'AI Builder',             desc:'Build something using an AI API.',                          rarity:'rare'   },
  { id:'sk70', cat:'skills', icon:'🧑‍🎨', name:'Digital Artist',       desc:'Create digital art using a tablet or software.',            rarity:'common' },

  // ══════════════════════════════════════════════════════════
  // EMOTIONAL (em01–em40)
  // ══════════════════════════════════════════════════════════
  { id:'em01', cat:'emotional', icon:'😢', name:'First Goodbye',        desc:'Experience a significant loss for the first time.',          rarity:'common' },
  { id:'em02', cat:'emotional', icon:'🔥', name:'Rising From Ashes',    desc:'Bounce back from your lowest point.',                        rarity:'epic'   },
  { id:'em03', cat:'emotional', icon:'🧠', name:'Therapy Works',        desc:'Seek and commit to professional mental health help.',        rarity:'rare'   },
  { id:'em04', cat:'emotional', icon:'🤗', name:'Ask For Help',         desc:'Ask someone for genuine help when you needed it.',           rarity:'rare'   },
  { id:'em05', cat:'emotional', icon:'💪', name:'I Am Enough',          desc:'Genuinely feel confident in who you are.',                   rarity:'epic'   },
  { id:'em06', cat:'emotional', icon:'😤', name:'Stood My Ground',      desc:'Say no and stick to it under real pressure.',                rarity:'rare'   },
  { id:'em07', cat:'emotional', icon:'🕊️', name:'Let It Go',            desc:'Truly forgive yourself for a past mistake.',                 rarity:'epic'   },
  { id:'em08', cat:'emotional', icon:'🌱', name:'Growth Mindset',       desc:'Change a deeply held limiting belief.',                      rarity:'epic'   },
  { id:'em09', cat:'emotional', icon:'💬', name:'Vulnerable',           desc:'Share something deeply personal and feel heard.',            rarity:'rare'   },
  { id:'em10', cat:'emotional', icon:'🌊', name:'Dark Night Passed',    desc:'Survive a true emotional crisis intact.',                    rarity:'legendary'},
  { id:'em11', cat:'emotional', icon:'😂', name:'Ugly Laughed',         desc:'Laugh so hard you cry and can\'t breathe.',                  rarity:'common' },
  { id:'em12', cat:'emotional', icon:'🫂', name:'Comforter',            desc:'Be the person someone needed in their worst moment.',        rarity:'epic'   },
  { id:'em13', cat:'emotional', icon:'🎭', name:'Mask Off',             desc:'Stop pretending to be someone you\'re not.',                 rarity:'epic'   },
  { id:'em14', cat:'emotional', icon:'🧩', name:'Puzzle Piece Found',   desc:'Find clarity on something that confused you for years.',     rarity:'rare'   },
  { id:'em15', cat:'emotional', icon:'🌅', name:'New Chapter',          desc:'Consciously close a chapter of your life and start fresh.',  rarity:'rare'   },
  { id:'em16', cat:'emotional', icon:'🔮', name:'Future Visionary',     desc:'Write out a clear vision for your future and believe it.',   rarity:'rare'   },
  { id:'em17', cat:'emotional', icon:'🧯', name:'Anger Managed',        desc:'Handle anger in a healthy, constructive way.',               rarity:'rare'   },
  { id:'em18', cat:'emotional', icon:'💛', name:'Gratitude Practice',   desc:'Maintain a gratitude journal for 30+ days.',                 rarity:'rare'   },
  { id:'em19', cat:'emotional', icon:'🔗', name:'Healthy Boundaries',   desc:'Set and maintain a healthy boundary with someone.',          rarity:'rare'   },
  { id:'em20', cat:'emotional', icon:'🌻', name:'Self-Care Sunday',     desc:'Prioritise yourself with a dedicated self-care routine.',    rarity:'common' },
  { id:'em21', cat:'emotional', icon:'🏔️', name:'Fear Faced',          desc:'Face one of your biggest fears deliberately.',               rarity:'epic'   },
  { id:'em22', cat:'emotional', icon:'🌠', name:'Dream Chaser',         desc:'Pursue a dream others told you was unrealistic.',            rarity:'epic'   },
  { id:'em23', cat:'emotional', icon:'🤲', name:'Radical Acceptance',   desc:'Accept something you cannot change.',                        rarity:'epic'   },
  { id:'em24', cat:'emotional', icon:'🧬', name:'Broke the Pattern',    desc:'Break a negative family or personal pattern.',               rarity:'legendary'},
  { id:'em25', cat:'emotional', icon:'🌡️', name:'Mood Tracker',        desc:'Track your mood daily for a full month.',                    rarity:'common' },
  { id:'em26', cat:'emotional', icon:'💡', name:'Aha Moment',           desc:'Have a genuine life-changing realisation.',                  rarity:'rare'   },
  { id:'em27', cat:'emotional', icon:'🔓', name:'Opened Up First',      desc:'Be the first to open up in a new relationship.',            rarity:'rare'   },
  { id:'em28', cat:'emotional', icon:'😌', name:'At Peace',             desc:'Feel genuinely at peace with your life.',                   rarity:'legendary'},
  { id:'em29', cat:'emotional', icon:'🌍', name:'Perspective Shift',    desc:'Have your worldview meaningfully changed by an experience.', rarity:'epic'   },
  { id:'em30', cat:'emotional', icon:'🏡', name:'Home Feeling',         desc:'Find a place that truly feels like home.',                  rarity:'rare'   },
  { id:'em31', cat:'emotional', icon:'✨', name:'Proud Moment',         desc:'Feel genuinely proud of yourself without qualification.',    rarity:'rare'   },
  { id:'em32', cat:'emotional', icon:'📔', name:'Journal Regular',      desc:'Keep a journal for 90+ consecutive days.',                   rarity:'rare'   },
  { id:'em33', cat:'emotional', icon:'🌈', name:'After the Storm',      desc:'Find joy again after a long difficult period.',             rarity:'epic'   },
  { id:'em34', cat:'emotional', icon:'🌙', name:'Night Owl Reflection', desc:'Have a profound late-night realisation about your life.',    rarity:'common' },
  { id:'em35', cat:'emotional', icon:'💎', name:'Values Defined',       desc:'Write down your core values and live by them.',             rarity:'rare'   },
  { id:'em36', cat:'emotional', icon:'🧘', name:'Equanimity',           desc:'Remain calm in a situation that would normally panic you.',  rarity:'epic'   },
  { id:'em37', cat:'emotional', icon:'🫧', name:'Digital Detox',        desc:'Spend 24 hours completely off all screens.',                rarity:'rare'   },
  { id:'em38', cat:'emotional', icon:'🌿', name:'Nature Heals',         desc:'Find genuine peace in nature during a hard time.',          rarity:'common' },
  { id:'em39', cat:'emotional', icon:'🎶', name:'Emotion Through Music',desc:'Find a song that perfectly describes your life at a moment.',rarity:'common' },
  { id:'em40', cat:'emotional', icon:'🌟', name:'Authentically You',    desc:'Live a day entirely on your own terms.',                    rarity:'epic'   },

  // ══════════════════════════════════════════════════════════
  // LIFE (li01–li80)
  // ══════════════════════════════════════════════════════════
  { id:'li01', cat:'life', icon:'✈️', name:'First Flight',              desc:'Board a plane for the first time.',                          rarity:'common' },
  { id:'li02', cat:'life', icon:'🗺️', name:'New Country',              desc:'Travel to a country different from your own.',               rarity:'rare'   },
  { id:'li03', cat:'life', icon:'🌐', name:'Continent Collector',       desc:'Visit 3 or more continents.',                               rarity:'epic'   },
  { id:'li04', cat:'life', icon:'🌏', name:'Globe Trotter',             desc:'Visit 10 or more countries.',                               rarity:'legendary'},
  { id:'li05', cat:'life', icon:'🏠', name:'Own Place',                 desc:'Live on your own for the first time.',                      rarity:'rare'   },
  { id:'li06', cat:'life', icon:'🔑', name:'Homeowner',                 desc:'Buy your first home.',                                      rarity:'legendary'},
  { id:'li07', cat:'life', icon:'💼', name:'First Paycheck',            desc:'Earn your very first paycheck.',                            rarity:'common' },
  { id:'li08', cat:'life', icon:'👔', name:'Hired',                     desc:'Get your first real full-time job.',                        rarity:'rare'   },
  { id:'li09', cat:'life', icon:'📈', name:'Promoted',                  desc:'Get a promotion.',                                          rarity:'rare'   },
  { id:'li10', cat:'life', icon:'🧑‍💼', name:'Boss Mode',              desc:'Manage or lead a team for the first time.',                  rarity:'epic'   },
  { id:'li11', cat:'life', icon:'💰', name:'Debt Free',                 desc:'Pay off all your debts.',                                   rarity:'epic'   },
  { id:'li12', cat:'life', icon:'🚀', name:'Founder',                   desc:'Start your own business or side project.',                  rarity:'legendary'},
  { id:'li13', cat:'life', icon:'🌅', name:'Sunrise Watcher',           desc:'Wake up to watch a sunrise intentionally.',                 rarity:'common' },
  { id:'li14', cat:'life', icon:'🎪', name:'Festival Goer',             desc:'Attend a major music or arts festival.',                    rarity:'common' },
  { id:'li15', cat:'life', icon:'🍕', name:'Midnight Meal',             desc:'Eat something delicious at 3am.',                          rarity:'common' },
  { id:'li16', cat:'life', icon:'🌧️', name:'Rain Dancer',              desc:'Stand in the rain on purpose.',                             rarity:'common' },
  { id:'li17', cat:'life', icon:'📜', name:'Signed Your Own Lease',     desc:'Sign an apartment lease yourself.',                        rarity:'rare'   },
  { id:'li18', cat:'life', icon:'🏖️', name:'Solo Vacation',            desc:'Travel somewhere alone.',                                   rarity:'rare'   },
  { id:'li19', cat:'life', icon:'🦋', name:'Butterfly Effect',          desc:'Make a decision that completely changes your life.',         rarity:'legendary'},
  { id:'li20', cat:'life', icon:'🎁', name:'Generous Soul',             desc:'Give an unexpected gift that made someone cry happy.',       rarity:'epic'   },
  { id:'li21', cat:'life', icon:'👶', name:'New Life',                  desc:'Become a parent.',                                          rarity:'legendary'},
  { id:'li22', cat:'life', icon:'🏔️', name:'The Long Game',            desc:'Achieve a goal you\'ve worked on for 5+ years.',             rarity:'legendary'},
  { id:'li23', cat:'life', icon:'⭐', name:'Legacy',                    desc:'Do something that will outlive you.',                        rarity:'legendary'},
  { id:'li24', cat:'life', icon:'🚢', name:'Ocean Crosser',             desc:'Travel across an ocean.',                                   rarity:'rare'   },
  { id:'li25', cat:'life', icon:'🎒', name:'Backpacker',                desc:'Travel with only a backpack for 2+ weeks.',                 rarity:'rare'   },
  { id:'li26', cat:'life', icon:'🏕️', name:'Wilderness Camper',        desc:'Camp in the wilderness without electricity.',                rarity:'common' },
  { id:'li27', cat:'life', icon:'🌋', name:'Volcano Visitor',           desc:'Visit an active or dormant volcano.',                       rarity:'rare'   },
  { id:'li28', cat:'life', icon:'🐘', name:'Safari Adventurer',         desc:'Go on a wildlife safari.',                                  rarity:'epic'   },
  { id:'li29', cat:'life', icon:'🗽', name:'Big City First',            desc:'Visit a major world capital for the first time.',           rarity:'common' },
  { id:'li30', cat:'life', icon:'🛤️', name:'Road Trip Solo',           desc:'Drive a solo road trip of 500+ km.',                        rarity:'rare'   },
  { id:'li31', cat:'life', icon:'💸', name:'Emergency Fund',            desc:'Save 3 months of expenses in an emergency fund.',           rarity:'rare'   },
  { id:'li32', cat:'life', icon:'📊', name:'Investor',                  desc:'Make your first investment in stocks, property, or a fund.',rarity:'rare'   },
  { id:'li33', cat:'life', icon:'💎', name:'First Major Purchase',      desc:'Buy your first major item with your own money.',            rarity:'common' },
  { id:'li34', cat:'life', icon:'🔋', name:'Career Pivot',              desc:'Successfully change careers.',                              rarity:'epic'   },
  { id:'li35', cat:'life', icon:'🧳', name:'Lived Abroad',              desc:'Live in a foreign country for 3+ months.',                  rarity:'epic'   },
  { id:'li36', cat:'life', icon:'🌙', name:'All-Nighter',               desc:'Pull an all-nighter for a worthy cause.',                   rarity:'common' },
  { id:'li37', cat:'life', icon:'🎰', name:'Vegas or Bust',             desc:'Visit a city famous for its nightlife.',                    rarity:'common' },
  { id:'li38', cat:'life', icon:'🧭', name:'Off the Map',               desc:'Visit a place not in any guidebook.',                       rarity:'rare'   },
  { id:'li39', cat:'life', icon:'🛸', name:'Vision Executed',           desc:'Have an idea and bring it to life.',                        rarity:'epic'   },
  { id:'li40', cat:'life', icon:'🌱', name:'Side Hustle',               desc:'Earn income outside your main job.',                        rarity:'rare'   },
  { id:'li41', cat:'life', icon:'📦', name:'Moved Cities',              desc:'Move to a new city for opportunity or growth.',             rarity:'rare'   },
  { id:'li42', cat:'life', icon:'🛂', name:'Passport Stamped',          desc:'Get your first passport stamp.',                            rarity:'common' },
  { id:'li43', cat:'life', icon:'🎖️', name:'Award Winner',             desc:'Win a formal award in your field.',                         rarity:'rare'   },
  { id:'li44', cat:'life', icon:'🛶', name:'River Runner',              desc:'Navigate a river by kayak, canoe, or raft.',                rarity:'rare'   },
  { id:'li45', cat:'life', icon:'🌞', name:'Digital Nomad Day',         desc:'Work remotely from a different country or city.',           rarity:'rare'   },
  { id:'li46', cat:'life', icon:'📺', name:'Media Appearance',          desc:'Appear on TV, radio, or a major publication.',              rarity:'epic'   },
  { id:'li47', cat:'life', icon:'🧑‍🚀', name:'Science Junkie',          desc:'Attend a space or science exhibition.',                     rarity:'common' },
  { id:'li48', cat:'life', icon:'🎗️', name:'Charity Fundraiser',       desc:'Raise money for a charitable cause.',                       rarity:'rare'   },
  { id:'li49', cat:'life', icon:'🏗️', name:'Built Something Real',      desc:'Build something physical with your own hands.',             rarity:'rare'   },
  { id:'li50', cat:'life', icon:'🚂', name:'Scenic Train Journey',      desc:'Take a long scenic train journey.',                         rarity:'common' },
  { id:'li51', cat:'life', icon:'🎡', name:'Carnival Win',              desc:'Win something at a carnival or fair game.',                 rarity:'common' },
  { id:'li52', cat:'life', icon:'🌿', name:'Off-Grid Weekend',          desc:'Spend a full weekend without technology.',                  rarity:'rare'   },
  { id:'li53', cat:'life', icon:'🔭', name:'Northern Lights',           desc:'See the Northern or Southern Lights in person.',            rarity:'epic'   },
  { id:'li54', cat:'life', icon:'🧊', name:'Unconventional Night',      desc:'Sleep somewhere truly unconventional.',                     rarity:'epic'   },
  { id:'li55', cat:'life', icon:'🏛️', name:'Seven Wonders',            desc:'Visit one of the Seven Wonders of the World.',              rarity:'epic'   },
  { id:'li56', cat:'life', icon:'🏆', name:'Five-Year Plan Done',       desc:'Complete a written five-year plan.',                        rarity:'rare'   },
  { id:'li57', cat:'life', icon:'🌊', name:'Night Swim',                desc:'Swim in the ocean or a lake at night.',                    rarity:'common' },
  { id:'li58', cat:'life', icon:'🎃', name:'Pumpkin Carver',            desc:'Carve a truly impressive pumpkin.',                        rarity:'common' },
  { id:'li59', cat:'life', icon:'🏡', name:'Garden Owner',              desc:'Maintain a vegetable or flower garden.',                    rarity:'common' },
  { id:'li60', cat:'life', icon:'🎄', name:'Host the Holidays',         desc:'Host Christmas, Thanksgiving, or equivalent for family.',   rarity:'rare'   },
  { id:'li61', cat:'life', icon:'🚁', name:'Helicopter Ride',           desc:'Ride in a helicopter.',                                     rarity:'rare'   },
  { id:'li62', cat:'life', icon:'🌻', name:'Fresh Start',               desc:'Leave something behind that no longer served you.',         rarity:'epic'   },
  { id:'li63', cat:'life', icon:'🏔️', name:'Summit Seeker',            desc:'Reach the summit of a mountain over 3,000m.',               rarity:'epic'   },
  { id:'li64', cat:'life', icon:'🎇', name:'New Year Abroad',           desc:'Celebrate New Year in a different country.',                rarity:'rare'   },
  { id:'li65', cat:'life', icon:'🦜', name:'Jungle Explorer',           desc:'Trek through a rainforest or jungle.',                      rarity:'rare'   },
  { id:'li66', cat:'life', icon:'🐋', name:'Whale Watcher',             desc:'See a whale in the wild.',                                  rarity:'rare'   },
  { id:'li67', cat:'life', icon:'🏜️', name:'Desert Walker',            desc:'Experience a real desert landscape.',                       rarity:'rare'   },
  { id:'li68', cat:'life', icon:'🎆', name:'100 Days of Something',     desc:'Do anything consistently for 100 days.',                   rarity:'epic'   },
  { id:'li69', cat:'life', icon:'💫', name:'Quarter Century',           desc:'Turn 25 years old.',                                        rarity:'rare'   },
  { id:'li70', cat:'life', icon:'🌟', name:'Half Century',              desc:'Turn 50 years old.',                                        rarity:'epic'   },
  { id:'li71', cat:'life', icon:'👑', name:'Three Quarters',            desc:'Turn 75 years old.',                                        rarity:'legendary'},
  { id:'li72', cat:'life', icon:'🔑', name:'Second Career',             desc:'Successfully build a second career.',                       rarity:'epic'   },
  { id:'li73', cat:'life', icon:'📱', name:'App Deleted',               desc:'Delete social media for 30+ days and not regret it.',       rarity:'rare'   },
  { id:'li74', cat:'life', icon:'🎯', name:'Bucket List Item',          desc:'Complete something on your bucket list.',                   rarity:'rare'   },
  { id:'li75', cat:'life', icon:'🌍', name:'20 Countries',              desc:'Visit 20 different countries in your lifetime.',            rarity:'legendary'},
  { id:'li76', cat:'life', icon:'🌕', name:'Full Moon Adventure',       desc:'Do something memorable under a full moon.',                 rarity:'common' },
  { id:'li77', cat:'life', icon:'🎰', name:'Calculated Risk',           desc:'Take a major risk that paid off.',                          rarity:'epic'   },
  { id:'li78', cat:'life', icon:'🛸', name:'Dream Job',                 desc:'Land your dream job.',                                      rarity:'legendary'},
  { id:'li79', cat:'life', icon:'🚁', name:'Year Abroad',               desc:'Spend an entire year living in a foreign country.',         rarity:'legendary'},
  { id:'li80', cat:'life', icon:'🌊', name:'Citizen of the World',      desc:'Feel truly at home in a country that isn\'t yours.',        rarity:'epic'   },

  // ══════════════════════════════════════════════════════════
  // HEALTH (he01–he40)
  // ══════════════════════════════════════════════════════════
  { id:'he01', cat:'health', icon:'🏃', name:'5K Finisher',             desc:'Run a 5K without stopping.',                                rarity:'rare'   },
  { id:'he02', cat:'health', icon:'🏅', name:'10K Warrior',             desc:'Run a 10K race.',                                           rarity:'rare'   },
  { id:'he03', cat:'health', icon:'🏆', name:'Half Marathon',           desc:'Complete a half marathon (21km).',                          rarity:'epic'   },
  { id:'he04', cat:'health', icon:'🦅', name:'Full Marathon',           desc:'Complete a full 42km marathon.',                            rarity:'legendary'},
  { id:'he05', cat:'health', icon:'🥗', name:'Whole Week Clean',        desc:'Eat healthy every single meal for one week.',               rarity:'common' },
  { id:'he06', cat:'health', icon:'🥤', name:'Alcohol-Free Month',      desc:'Go one full month without any alcohol.',                    rarity:'rare'   },
  { id:'he07', cat:'health', icon:'😴', name:'Sleep Schedule',          desc:'Maintain a consistent sleep schedule for 2 weeks.',         rarity:'common' },
  { id:'he08', cat:'health', icon:'🧗', name:'First Summit',            desc:'Hike to a mountain summit.',                                rarity:'rare'   },
  { id:'he09', cat:'health', icon:'🩺', name:'Annual Checkup',          desc:'Go to a doctor for a preventive checkup.',                  rarity:'common' },
  { id:'he10', cat:'health', icon:'🦷', name:'Dentist Survivor',        desc:'Successfully go to the dentist without panic.',             rarity:'common' },
  { id:'he11', cat:'health', icon:'🧬', name:'30-Day Streak',           desc:'Exercise every day for 30 consecutive days.',               rarity:'rare'   },
  { id:'he12', cat:'health', icon:'⚡', name:'100-Day Streak',          desc:'Exercise every day for 100 consecutive days.',              rarity:'legendary'},
  { id:'he13', cat:'health', icon:'💧', name:'Hydration Hero',          desc:'Drink 8 glasses of water every day for a week.',            rarity:'common' },
  { id:'he14', cat:'health', icon:'🍎', name:'No Sugar Week',           desc:'Avoid added sugar for a full week.',                        rarity:'rare'   },
  { id:'he15', cat:'health', icon:'🌞', name:'Vitamin D',               desc:'Spend time outdoors every day for a month.',                rarity:'common' },
  { id:'he16', cat:'health', icon:'🏋️', name:'Lifted Heavy',           desc:'Lift a weight you thought was impossible.',                 rarity:'rare'   },
  { id:'he17', cat:'health', icon:'🤸', name:'Flexible',                desc:'Touch your toes after months of stretching practice.',      rarity:'common' },
  { id:'he18', cat:'health', icon:'🚶', name:'10K Steps Daily',         desc:'Hit 10,000 steps every day for a month.',                   rarity:'rare'   },
  { id:'he19', cat:'health', icon:'🌿', name:'Vegetarian Week',         desc:'Eat vegetarian for a full week.',                           rarity:'common' },
  { id:'he20', cat:'health', icon:'🫁', name:'Quit Smoking',            desc:'Quit smoking for 1+ year.',                                 rarity:'epic'   },
  { id:'he21', cat:'health', icon:'🏊', name:'Open Water Swimmer',      desc:'Swim in open water — lake, ocean, or river.',               rarity:'rare'   },
  { id:'he22', cat:'health', icon:'🧘', name:'Yoga Practitioner',       desc:'Practise yoga consistently for 3+ months.',                 rarity:'rare'   },
  { id:'he23', cat:'health', icon:'🩸', name:'Blood Donor',             desc:'Donate blood for the first time.',                          rarity:'rare'   },
  { id:'he24', cat:'health', icon:'🌱', name:'Vegan Challenge',         desc:'Eat completely vegan for 30 days.',                         rarity:'rare'   },
  { id:'he25', cat:'health', icon:'🏃', name:'Speed Improver',          desc:'Beat your personal running time by 10%.',                   rarity:'rare'   },
  { id:'he26', cat:'health', icon:'🧠', name:'Brain Trainer',           desc:'Train your mind daily for 30 days with puzzles or learning.',rarity:'common' },
  { id:'he27', cat:'health', icon:'⚖️', name:'Healthy Balance',        desc:'Reach and maintain a healthy weight for 6 months.',         rarity:'epic'   },
  { id:'he28', cat:'health', icon:'🎽', name:'Triathlete',              desc:'Complete a triathlon.',                                     rarity:'legendary'},
  { id:'he29', cat:'health', icon:'🥊', name:'Boxer',                   desc:'Train in boxing or kickboxing for 3+ months.',              rarity:'rare'   },
  { id:'he30', cat:'health', icon:'🚴', name:'Cyclist Commuter',        desc:'Cycle to work or school for a full month.',                 rarity:'rare'   },
  { id:'he31', cat:'health', icon:'🏞️', name:'Nature Walker',          desc:'Walk in nature at least once a week for 3 months.',         rarity:'common' },
  { id:'he32', cat:'health', icon:'🍳', name:'Meal Prepper',            desc:'Meal prep successfully for a full week.',                   rarity:'common' },
  { id:'he33', cat:'health', icon:'💪', name:'100 Push-ups',            desc:'Do 100 push-ups in a single session.',                      rarity:'epic'   },
  { id:'he34', cat:'health', icon:'🌙', name:'8-Hour Sleeper',          desc:'Sleep a full 8 hours every night for 2 weeks.',             rarity:'rare'   },
  { id:'he35', cat:'health', icon:'🧴', name:'Skincare Routine',        desc:'Follow a consistent skincare routine for 60 days.',         rarity:'common' },
  { id:'he36', cat:'health', icon:'🏃', name:'Ultra Runner',            desc:'Run more than 50km in a single week.',                      rarity:'legendary'},
  { id:'he37', cat:'health', icon:'🥗', name:'Plant-Based Month',       desc:'Eat mostly plant-based for a full month.',                  rarity:'rare'   },
  { id:'he38', cat:'health', icon:'🫀', name:'Heart Healthy',           desc:'Get a clean bill of cardiovascular health.',                rarity:'rare'   },
  { id:'he39', cat:'health', icon:'🧘', name:'Mindfulness Minutes',     desc:'Meditate for 10+ minutes daily for 21 days.',               rarity:'common' },
  { id:'he40', cat:'health', icon:'🏆', name:'Ironman',                 desc:'Complete an Ironman triathlon.',                            rarity:'legendary'},

  // ══════════════════════════════════════════════════════════
  // CREATIVE (cr01–cr50)
  // ══════════════════════════════════════════════════════════
  { id:'cr01', cat:'creative', icon:'🎬', name:'Filmmaker',             desc:'Make and share a short film or video.',                      rarity:'rare'   },
  { id:'cr02', cat:'creative', icon:'🎵', name:'Original Song',         desc:'Write and record an original song.',                         rarity:'epic'   },
  { id:'cr03', cat:'creative', icon:'📷', name:'Photographer',          desc:'Take a photo that genuinely moves people.',                 rarity:'common' },
  { id:'cr04', cat:'creative', icon:'📗', name:'Novel Draft',           desc:'Write 50,000+ words of fiction.',                           rarity:'epic'   },
  { id:'cr05', cat:'creative', icon:'🎭', name:'On Stage',              desc:'Perform in front of an audience.',                          rarity:'rare'   },
  { id:'cr06', cat:'creative', icon:'🎤', name:'Karaoke Courage',       desc:'Sing karaoke sober.',                                       rarity:'common' },
  { id:'cr07', cat:'creative', icon:'🎮', name:'Game Creator',          desc:'Build a game, even a simple one.',                          rarity:'rare'   },
  { id:'cr08', cat:'creative', icon:'🖌️', name:'Gallery Ready',         desc:'Display your artwork in a public space.',                    rarity:'epic'   },
  { id:'cr09', cat:'creative', icon:'🧶', name:'Made With Hands',       desc:'Complete a handicraft project such as knitting or woodwork.',rarity:'common' },
  { id:'cr10', cat:'creative', icon:'📻', name:'On Air',                desc:'Appear on a podcast, radio, or livestream.',                rarity:'rare'   },
  { id:'cr11', cat:'creative', icon:'💡', name:'Patent Holder',         desc:'Invent something and formally patent it.',                  rarity:'legendary'},
  { id:'cr12', cat:'creative', icon:'🌟', name:'Viral Moment',          desc:'Create content that reaches 10,000+ people.',               rarity:'epic'   },
  { id:'cr13', cat:'creative', icon:'🎨', name:'Art Series',            desc:'Create a series of 10+ related artworks.',                  rarity:'rare'   },
  { id:'cr14', cat:'creative', icon:'📸', name:'Photo Exhibition',      desc:'Display your photos in a gallery or exhibition.',           rarity:'epic'   },
  { id:'cr15', cat:'creative', icon:'✍️', name:'Blog Writer',           desc:'Write and publish 12+ blog posts.',                         rarity:'rare'   },
  { id:'cr16', cat:'creative', icon:'🎙️', name:'Podcast Season',        desc:'Release a full season of podcast episodes.',                rarity:'epic'   },
  { id:'cr17', cat:'creative', icon:'🎸', name:'Band Member',           desc:'Play in a band with others.',                               rarity:'rare'   },
  { id:'cr18', cat:'creative', icon:'🎶', name:'Cover Song',            desc:'Record a cover of a song and share it.',                    rarity:'common' },
  { id:'cr19', cat:'creative', icon:'🖊️', name:'Short Story Published', desc:'Publish a short story in any format.',                      rarity:'rare'   },
  { id:'cr20', cat:'creative', icon:'🎭', name:'Stand-Up Set',          desc:'Perform a stand-up comedy set.',                            rarity:'epic'   },
  { id:'cr21', cat:'creative', icon:'🌈', name:'Muralist',              desc:'Paint a mural or large-scale public artwork.',              rarity:'epic'   },
  { id:'cr22', cat:'creative', icon:'🖼️', name:'Art Sold',             desc:'Sell a piece of your own artwork.',                          rarity:'rare'   },
  { id:'cr23', cat:'creative', icon:'📖', name:'Graphic Novel',         desc:'Create a graphic novel or comic series.',                   rarity:'epic'   },
  { id:'cr24', cat:'creative', icon:'🎥', name:'YouTube Channel',       desc:'Create and post 10+ videos on YouTube.',                    rarity:'rare'   },
  { id:'cr25', cat:'creative', icon:'🧵', name:'Fashion Designer',      desc:'Design and make your own clothing item.',                   rarity:'rare'   },
  { id:'cr26', cat:'creative', icon:'🏺', name:'Potter',                desc:'Create a functional piece of pottery.',                     rarity:'common' },
  { id:'cr27', cat:'creative', icon:'🎨', name:'Portrait Artist',       desc:'Paint or draw a recognisable portrait of someone.',         rarity:'rare'   },
  { id:'cr28', cat:'creative', icon:'🔊', name:'Beat Maker',            desc:'Produce an original beat or music track.',                  rarity:'rare'   },
  { id:'cr29', cat:'creative', icon:'📝', name:'Screenwriter',          desc:'Write a complete screenplay or script.',                    rarity:'epic'   },
  { id:'cr30', cat:'creative', icon:'🌐', name:'1,000 Followers',       desc:'Build an audience of 1,000+ followers on any platform.',    rarity:'rare'   },
  { id:'cr31', cat:'creative', icon:'🌟', name:'10K Followers',         desc:'Build an audience of 10,000+ followers on any platform.',   rarity:'epic'   },
  { id:'cr32', cat:'creative', icon:'💫', name:'100K Followers',        desc:'Build an audience of 100,000+ followers on any platform.',  rarity:'legendary'},
  { id:'cr33', cat:'creative', icon:'📚', name:'Zine Maker',            desc:'Create and distribute a self-made zine.',                   rarity:'common' },
  { id:'cr34', cat:'creative', icon:'🎬', name:'Documentary',           desc:'Film a documentary about a real subject.',                  rarity:'epic'   },
  { id:'cr35', cat:'creative', icon:'🖊️', name:'NaNoWriMo',            desc:'Participate in National Novel Writing Month.',              rarity:'rare'   },
  { id:'cr36', cat:'creative', icon:'🎯', name:'Creative Streak',       desc:'Create something new every day for 30 days.',               rarity:'rare'   },
  { id:'cr37', cat:'creative', icon:'🌺', name:'Collage Artist',        desc:'Create a large mixed-media collage.',                       rarity:'common' },
  { id:'cr38', cat:'creative', icon:'🎻', name:'Composer',              desc:'Compose an original piece of music.',                       rarity:'epic'   },
  { id:'cr39', cat:'creative', icon:'🎪', name:'Street Performer',      desc:'Perform in a public space for strangers.',                  rarity:'rare'   },
  { id:'cr40', cat:'creative', icon:'🎮', name:'Game Released',         desc:'Release a game that other people actually play.',           rarity:'epic'   },
  { id:'cr41', cat:'creative', icon:'🌊', name:'Sand Sculptor',         desc:'Build an impressive sand sculpture.',                       rarity:'common' },
  { id:'cr42', cat:'creative', icon:'🪵', name:'Sculptor',              desc:'Create a 3D sculpture from any material.',                  rarity:'rare'   },
  { id:'cr43', cat:'creative', icon:'📷', name:'Wedding Photographer',  desc:'Photograph someone\'s wedding.',                            rarity:'rare'   },
  { id:'cr44', cat:'creative', icon:'🧸', name:'Toy Maker',             desc:'Hand-make a toy or stuffed animal.',                        rarity:'common' },
  { id:'cr45', cat:'creative', icon:'🎨', name:'Art Teacher',           desc:'Teach someone an art skill.',                               rarity:'rare'   },
  { id:'cr46', cat:'creative', icon:'📰', name:'Newsletter Editor',     desc:'Run a newsletter with 100+ subscribers.',                   rarity:'rare'   },
  { id:'cr47', cat:'creative', icon:'🎭', name:'Improv Troupe',         desc:'Join an improv comedy group.',                              rarity:'rare'   },
  { id:'cr48', cat:'creative', icon:'🖌️', name:'Mural Painter',         desc:'Paint a full mural on a large wall.',                       rarity:'epic'   },
  { id:'cr49', cat:'creative', icon:'✏️', name:'Cartoon Creator',       desc:'Draw a recurring cartoon character.',                        rarity:'common' },
  { id:'cr50', cat:'creative', icon:'🎤', name:'Open Mic Night',        desc:'Perform at an open mic night.',                             rarity:'rare'   },

  // ══════════════════════════════════════════════════════════
  // MISC / BONUS (mx01–mx91)
  // ══════════════════════════════════════════════════════════
  { id:'mx01', cat:'life',      icon:'🌙', name:'Night Owl',            desc:'Stay awake to watch the sun rise after a night of fun.',    rarity:'common' },
  { id:'mx02', cat:'skills',    icon:'♟️', name:'Chess Player',         desc:'Learn chess and beat someone who taught you.',              rarity:'rare'   },
  { id:'mx03', cat:'health',    icon:'🥋', name:'Martial Arts Belt',    desc:'Earn a coloured belt in martial arts.',                     rarity:'rare'   },
  { id:'mx04', cat:'life',      icon:'🎟️', name:'Sold Out Show',        desc:'Attend a sold-out event.',                                  rarity:'common' },
  { id:'mx05', cat:'social',    icon:'🐾', name:'Rescue Pet Parent',    desc:'Adopt a rescue animal.',                                    rarity:'rare'   },
  { id:'mx06', cat:'emotional', icon:'📵', name:'Phone-Free Day',       desc:'Go an entire day without your phone.',                      rarity:'rare'   },
  { id:'mx07', cat:'life',      icon:'🌊', name:'Cliff Jumper',         desc:'Jump from a cliff or high ledge into water safely.',        rarity:'rare'   },
  { id:'mx08', cat:'skills',    icon:'🪃', name:'Boomerang Thrower',    desc:'Successfully throw and catch a boomerang.',                 rarity:'common' },
  { id:'mx09', cat:'creative',  icon:'🎲', name:'Game Designer',        desc:'Design a board game or card game others play.',             rarity:'rare'   },
  { id:'mx10', cat:'social',    icon:'🌺', name:'Cultural Festival',    desc:'Attend a cultural festival outside your own culture.',      rarity:'common' },
  { id:'mx11', cat:'health',    icon:'🌡️', name:'Health Scare Survivor',desc:'Recover from a health scare stronger than before.',         rarity:'epic'   },
  { id:'mx12', cat:'skills',    icon:'🔭', name:'Amateur Astronomer',   desc:'Identify 20 constellations on a clear night.',              rarity:'common' },
  { id:'mx13', cat:'social',    icon:'🌍', name:'Language Exchange',    desc:'Practice a language with a native speaker.',                rarity:'common' },
  { id:'mx14', cat:'life',      icon:'🏅', name:'Award Nominated',      desc:'Be nominated for a formal award.',                          rarity:'rare'   },
  { id:'mx15', cat:'emotional', icon:'🌸', name:'Spring Cleaning Soul', desc:'Declutter your life — possessions and relationships.',      rarity:'rare'   },
  { id:'mx16', cat:'life',      icon:'🎯', name:'Vision Board',         desc:'Make a vision board and achieve something on it.',          rarity:'rare'   },
  { id:'mx17', cat:'health',    icon:'🤸', name:'Handstand',            desc:'Successfully hold a handstand for 5 seconds.',              rarity:'rare'   },
  { id:'mx18', cat:'skills',    icon:'🌊', name:'Paddleboarder',        desc:'Successfully paddleboard for 20+ minutes.',                 rarity:'common' },
  { id:'mx19', cat:'creative',  icon:'🎨', name:'Art Challenge',        desc:'Complete an art challenge like Inktober.',                  rarity:'rare'   },
  { id:'mx20', cat:'social',    icon:'🎓', name:'Speech Given',         desc:'Give a speech at a wedding, graduation, or big event.',     rarity:'rare'   },
  { id:'mx21', cat:'life',      icon:'🌍', name:'Charity Run',          desc:'Complete a charity run or walk event.',                     rarity:'common' },
  { id:'mx22', cat:'emotional', icon:'🛖', name:'Simplifier',           desc:'Live with less and feel freer for it.',                     rarity:'rare'   },
  { id:'mx23', cat:'creative',  icon:'🧱', name:'LEGO Architect',       desc:'Build a LEGO set of 1,000+ pieces.',                        rarity:'common' },
  { id:'mx24', cat:'skills',    icon:'🪚', name:'Workshop Builder',     desc:'Complete a project in a makerspace or workshop.',           rarity:'rare'   },
  { id:'mx25', cat:'health',    icon:'🚣', name:'Rower',                desc:'Row 5km on water or a rowing machine.',                     rarity:'rare'   },
  { id:'mx26', cat:'life',      icon:'🌕', name:'Eclipse Watcher',      desc:'Witness a solar or lunar eclipse.',                         rarity:'rare'   },
  { id:'mx27', cat:'social',    icon:'🦁', name:'Community Leader',     desc:'Lead or organise a community group or event.',              rarity:'epic'   },
  { id:'mx28', cat:'life',      icon:'🎭', name:'Renaissance Soul',     desc:'Have 5+ serious hobbies across different disciplines.',     rarity:'epic'   },
  { id:'mx29', cat:'emotional', icon:'🗓️', name:'Year in Review',      desc:'Write a meaningful year-in-review reflection.',             rarity:'common' },
  { id:'mx30', cat:'life',      icon:'🌾', name:'Farmer for a Day',    desc:'Work on a farm or participate in a harvest.',               rarity:'rare'   },
  { id:'mx31', cat:'social',    icon:'🏘️', name:'Block Party',          desc:'Organise or attend a neighbourhood block party.',           rarity:'common' },
  { id:'mx32', cat:'skills',    icon:'🧲', name:'3D Printer',           desc:'Design and print a 3D object.',                            rarity:'rare'   },
  { id:'mx33', cat:'creative',  icon:'📻', name:'Radio DJ',             desc:'Host or DJ a radio show, even online.',                    rarity:'rare'   },
  { id:'mx34', cat:'health',    icon:'🦵', name:'Never Skip Leg Day',   desc:'Never skip leg day for 3 months straight.',                rarity:'rare'   },
  { id:'mx35', cat:'social',    icon:'🧑‍🤝‍🧑', name:'Pen Pals for Life', desc:'Keep a pen pal for 5+ years.',                           rarity:'rare'   },
  { id:'mx36', cat:'life',      icon:'🌊', name:'Sunset Swimmer',       desc:'Swim in the sea at sunset.',                               rarity:'common' },
  { id:'mx37', cat:'emotional', icon:'🌻', name:'Positive Self-Talk',   desc:'Replace a negative inner voice with a positive one.',      rarity:'epic'   },
  { id:'mx38', cat:'skills',    icon:'🔦', name:'Survivalist',          desc:'Spend 48 hours with only basic survival gear.',            rarity:'epic'   },
  { id:'mx39', cat:'life',      icon:'⛷️', name:'Ski Novice',           desc:'Learn to ski or snowboard.',                               rarity:'rare'   },
  { id:'mx40', cat:'creative',  icon:'🎭', name:'Character Actor',      desc:'Fully embody a character in a play or film.',              rarity:'rare'   },
  { id:'mx41', cat:'social',    icon:'🔥', name:'Campfire Storyteller', desc:'Tell a story around a campfire that captivates everyone.',  rarity:'common' },
  { id:'mx42', cat:'health',    icon:'🧖', name:'Spa Day',              desc:'Have a full spa day and completely unwind.',               rarity:'common' },
  { id:'mx43', cat:'life',      icon:'🚀', name:'Product Launched',     desc:'Launch a product or service to real customers.',           rarity:'epic'   },
  { id:'mx44', cat:'social',    icon:'🎊', name:'Class Reunion',        desc:'Attend a school reunion.',                                 rarity:'common' },
  { id:'mx45', cat:'emotional', icon:'🌸', name:'Wrote Unsent Letter',  desc:'Write a letter to someone, never send it, and feel free.',  rarity:'rare'   },
  { id:'mx46', cat:'skills',    icon:'🎵', name:'Music Producer',       desc:'Produce a full music track with mixing and mastering.',    rarity:'epic'   },
  { id:'mx47', cat:'life',      icon:'🏔️', name:'Remote Worker',       desc:'Work remotely from a truly remote location.',              rarity:'rare'   },
  { id:'mx48', cat:'health',    icon:'🥄', name:'Intermittent Faster',  desc:'Practice intermittent fasting for 30 days.',               rarity:'common' },
  { id:'mx49', cat:'creative',  icon:'📽️', name:'Film Festival Entry',  desc:'Submit a film to any film festival.',                      rarity:'epic'   },
  { id:'mx50', cat:'social',    icon:'🫶', name:'Pay It Forward',       desc:'Pay for a stranger\'s meal or coffee.',                    rarity:'common' },
  { id:'mx51', cat:'skills',    icon:'🪴', name:'Plant Propagator',     desc:'Successfully propagate 5+ plants.',                        rarity:'common' },
  { id:'mx52', cat:'emotional', icon:'✈️', name:'Solo Soul Search',     desc:'Travel alone to think through a major life question.',     rarity:'rare'   },
  { id:'mx53', cat:'social',    icon:'🏅', name:'Coach',                desc:'Coach a team or individual to improvement.',               rarity:'rare'   },
  { id:'mx54', cat:'life',      icon:'💼', name:'Freelancer',           desc:'Earn income as a freelancer.',                             rarity:'rare'   },
  { id:'mx55', cat:'skills',    icon:'🧊', name:'Cold Shower Regular',  desc:'Take cold showers every morning for 30 days.',             rarity:'rare'   },
  { id:'mx56', cat:'health',    icon:'🫶', name:'Mental Health Advocate',desc:'Openly advocate for mental health awareness.',            rarity:'rare'   },
  { id:'mx57', cat:'creative',  icon:'🧩', name:'Puzzle Designer',      desc:'Design a puzzle that others can solve.',                   rarity:'rare'   },
  { id:'mx58', cat:'life',      icon:'🌊', name:'Cruise Traveller',     desc:'Take an ocean cruise.',                                    rarity:'rare'   },
  { id:'mx59', cat:'social',    icon:'💬', name:'TEDx Attendee',        desc:'Attend a TED or TEDx event in person.',                    rarity:'rare'   },
  { id:'mx60', cat:'life',      icon:'🧘', name:'Ashram or Retreat',    desc:'Attend a silent retreat or ashram.',                       rarity:'rare'   },
  { id:'mx61', cat:'skills',    icon:'🖱️', name:'Touch Typist',         desc:'Type 80+ words per minute.',                               rarity:'rare'   },
  { id:'mx62', cat:'emotional', icon:'🕯️', name:'Lost and Found',      desc:'Lose your way in life and find yourself again.',           rarity:'legendary'},
  { id:'mx63', cat:'social',    icon:'🌻', name:'Random Acts of Kindness',desc:'Do 10 documented random acts of kindness.',              rarity:'rare'   },
  { id:'mx64', cat:'health',    icon:'🧗', name:'Indoor Climber',       desc:'Top a V4+ bouldering route.',                              rarity:'rare'   },
  { id:'mx65', cat:'creative',  icon:'🪆', name:'Collector',            desc:'Build a curated collection of 100+ items.',                rarity:'common' },
  { id:'mx66', cat:'life',      icon:'🐚', name:'Beachcomber',          desc:'Collect something beautiful from every beach you visit.',  rarity:'common' },
  { id:'mx67', cat:'skills',    icon:'🌶️', name:'Hot Sauce Challenger', desc:'Eat one of the world\'s hottest foods.',                   rarity:'common' },
  { id:'mx68', cat:'social',    icon:'🎠', name:'Festival Organiser',   desc:'Organise a public event or festival.',                     rarity:'epic'   },
  { id:'mx69', cat:'health',    icon:'🌬️', name:'Breath Work',         desc:'Complete a breathwork or Wim Hof session.',                rarity:'common' },
  { id:'mx70', cat:'creative',  icon:'🎡', name:'Theme Park Devotee',   desc:'Ride every attraction at a major theme park.',             rarity:'common' },
  { id:'mx71', cat:'life',      icon:'🚂', name:'Epic Train Journey',   desc:'Complete a multi-day scenic train journey.',               rarity:'legendary'},
  { id:'mx72', cat:'emotional', icon:'🌅', name:'Second Chance',        desc:'Get a second chance at something important and take it.',  rarity:'epic'   },
  { id:'mx73', cat:'social',    icon:'💌', name:'Fan Letter',           desc:'Write a genuine fan letter to someone you admire.',        rarity:'common' },
  { id:'mx74', cat:'life',      icon:'🌙', name:'Stargazer',            desc:'Spend an entire night under the stars.',                   rarity:'common' },
  { id:'mx75', cat:'health',    icon:'🏊', name:'Ice Bath',             desc:'Take an ice bath for recovery.',                           rarity:'rare'   },
  { id:'mx76', cat:'creative',  icon:'🧶', name:'Cross-Stitch Artist',  desc:'Complete a cross-stitch piece.',                           rarity:'common' },
  { id:'mx77', cat:'social',    icon:'🗣️', name:'Networker',            desc:'Build a professional network of 100+ meaningful contacts.',rarity:'rare'   },
  { id:'mx78', cat:'life',      icon:'🌿', name:'Carbon Neutral Day',   desc:'Spend a day with as small a footprint as possible.',       rarity:'rare'   },
  { id:'mx79', cat:'life',      icon:'🔮', name:'Life Coach',           desc:'Work with a life coach.',                                  rarity:'rare'   },
  { id:'mx80', cat:'social',    icon:'🏠', name:'Host an Exchange Student',desc:'Welcome a foreign exchange student into your home.',    rarity:'epic'   },
  { id:'mx81', cat:'skills',    icon:'🎹', name:'Sheet Music Reader',   desc:'Learn to read sheet music.',                               rarity:'rare'   },
  { id:'mx82', cat:'life',      icon:'🏆', name:'10-Year Goal',         desc:'Achieve a goal you set 10+ years ago.',                    rarity:'legendary'},
  { id:'mx83', cat:'creative',  icon:'🖼️', name:'Art Commission',      desc:'Be commissioned to create something for someone.',          rarity:'rare'   },
  { id:'mx84', cat:'health',    icon:'🧬', name:'DNA Test',             desc:'Explore your ancestry through a DNA test.',                rarity:'common' },
  { id:'mx85', cat:'social',    icon:'🤝', name:'Mentor Relationship',  desc:'Be in a formal mentor-mentee relationship.',               rarity:'rare'   },
  { id:'mx86', cat:'life',      icon:'🛤️', name:'Pilgrimage',          desc:'Walk a famous route or trail as a personal journey.',      rarity:'epic'   },
  { id:'mx87', cat:'skills',    icon:'🧮', name:'Speed Cuber',          desc:'Solve a Rubik\'s cube.',                                   rarity:'rare'   },
  { id:'mx88', cat:'emotional', icon:'🌊', name:'Therapy Graduate',     desc:'Complete a full course of therapy with clear progress.',   rarity:'epic'   },
  { id:'mx89', cat:'life',      icon:'🌟', name:'Keynote Speaker',      desc:'Deliver a keynote address at any event.',                  rarity:'legendary'},
  { id:'mx90', cat:'creative',  icon:'🎙️', name:'Audiobook Narrator',   desc:'Record and narrate an audiobook or audio story.',         rarity:'rare'   },
  { id:'mx91', cat:'life',      icon:'🏅', name:'Volunteer of the Year',desc:'Be recognised for outstanding volunteer contributions.',   rarity:'epic'   },
];

// ─── STATE ───────────────────────────────────────────────────
// localStorage key unchanged — all existing user data is preserved
let state = {
  playerName: 'UNKNOWN',
  unlocked: {},
  xp: 0,
  level: 1,
};

let activeRarity = 'all';
let activeCat    = 'all';
let activeStatus = 'all';
let searchTerm   = '';
let sortMode     = 'default';
let toastTimer   = null;

// ─── PERSISTENCE ─────────────────────────────────────────────
function saveState() {
  try { localStorage.setItem('lifeexe_state', JSON.stringify(state)); } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem('lifeexe_state');
    if (raw) state = { ...state, ...JSON.parse(raw) };
  } catch(e) {}
}

// ─── LEVEL SYSTEM ────────────────────────────────────────────
function computeLevel(totalXP) {
  let lvl = 1, acc = 0;
  while (true) {
    const needed = xpForLevel(lvl);
    if (acc + needed > totalXP) break;
    acc += needed;
    lvl++;
  }
  return { level: lvl, xpInLevel: totalXP - acc, xpNeeded: xpForLevel(lvl) };
}

// ─── HUD ─────────────────────────────────────────────────────
function updateHUD() {
  const { level, xpInLevel, xpNeeded } = computeLevel(state.xp);
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  const unlockedCount = Object.keys(state.unlocked).length;

  document.getElementById('player-name').textContent    = state.playerName.toUpperCase();
  document.getElementById('player-level').textContent   = String(level).padStart(2,'0');
  document.getElementById('player-xp').textContent      = state.xp.toLocaleString();
  document.getElementById('unlocked-count').textContent = `${unlockedCount} / ${ACHIEVEMENTS.length}`;
  document.getElementById('completion-pct').textContent = `${Math.round((unlockedCount/ACHIEVEMENTS.length)*100)}%`;
  document.getElementById('xp-bar-fill').style.width    = pct + '%';
  document.getElementById('xp-bar-label').textContent   = `${xpInLevel.toLocaleString()} / ${xpNeeded.toLocaleString()} XP TO LEVEL ${level+1}`;

  ['common','rare','epic','legendary'].forEach(r => {
    const n = ACHIEVEMENTS.filter(a => a.rarity === r && state.unlocked[a.id]).length;
    document.getElementById('stat-'+r).textContent = n;
  });
}

// ─── GRID ────────────────────────────────────────────────────
function getFilteredSorted() {
  let list = [...ACHIEVEMENTS];
  if (activeRarity !== 'all') list = list.filter(a => a.rarity === activeRarity);
  if (activeCat    !== 'all') list = list.filter(a => a.cat    === activeCat);
  if (activeStatus === 'unlocked') list = list.filter(a =>  state.unlocked[a.id]);
  if (activeStatus === 'locked')   list = list.filter(a => !state.unlocked[a.id]);
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    list = list.filter(a => a.name.toLowerCase().includes(t) || a.desc.toLowerCase().includes(t));
  }
  const order = { common:0, rare:1, epic:2, legendary:3 };
  if (sortMode === 'rarity')   list.sort((a,b) => order[b.rarity] - order[a.rarity]);
  if (sortMode === 'xp')       list.sort((a,b) => XP_VALUES[b.rarity] - XP_VALUES[a.rarity]);
  if (sortMode === 'unlocked') list.sort((a,b) => (state.unlocked[b.id]||0) - (state.unlocked[a.id]||0));
  if (sortMode === 'locked')   list.sort((a,b) => (!!state.unlocked[a.id]) - (!!state.unlocked[b.id]));
  return list;
}

function buildCard(ach) {
  const isUnlocked = !!state.unlocked[ach.id];
  const card = document.createElement('div');
  card.className = 'achievement-card' + (isUnlocked ? ' unlocked' : '');
  card.dataset.id     = ach.id;
  card.dataset.rarity = ach.rarity;
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  card.setAttribute('aria-label', ach.name + (isUnlocked ? ' (unlocked)' : ' (locked)'));

  const dateStr = isUnlocked
    ? `<div class="card-date">Unlocked ${new Date(state.unlocked[ach.id]).toLocaleDateString()}</div>` : '';

  card.innerHTML = `
    <div class="card-icon">${ach.icon}</div>
    <div class="card-body">
      <div class="card-name">${ach.name}</div>
      <div class="card-desc">${ach.desc}</div>
      <div class="card-footer">
        <span class="card-rarity ${ach.rarity}">${ach.rarity}</span>
        <span class="card-xp">+${XP_VALUES[ach.rarity]} XP</span>
      </div>
      ${dateStr}
    </div>
    <div class="card-status">${isUnlocked ? '✔' : '🔒'}</div>`;

  card.addEventListener('click', () => toggleAchievement(ach.id));
  card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggleAchievement(ach.id); });
  return card;
}

function renderGrid() {
  const grid = document.getElementById('achievement-grid');
  grid.innerHTML = '';
  const list = getFilteredSorted();
  if (!list.length) {
    const e = document.createElement('div');
    e.className = 'empty-state';
    e.textContent = '[ NO ACHIEVEMENTS FOUND ]';
    grid.appendChild(e);
    return;
  }
  list.forEach(a => grid.appendChild(buildCard(a)));
}

// ─── TOGGLE ──────────────────────────────────────────────────
function toggleAchievement(id) {
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return;
  if (state.unlocked[id]) {
    delete state.unlocked[id];
    state.xp = Math.max(0, state.xp - XP_VALUES[ach.rarity]);
    saveState(); renderGrid(); updateHUD(); return;
  }
  const prevLevel = computeLevel(state.xp).level;
  state.unlocked[id] = Date.now();
  state.xp += XP_VALUES[ach.rarity];
  saveState();

  const newCard = buildCard(ach);
  newCard.classList.add('just-unlocked');
  const old = document.querySelector(`.achievement-card[data-id="${id}"]`);
  if (old) old.parentNode.replaceChild(newCard, old);
  setTimeout(() => newCard.classList.remove('just-unlocked'), 800);

  updateHUD();
  showToast(ach);
  playUnlockSound(ach.rarity);
  if (computeLevel(state.xp).level > prevLevel)
    setTimeout(() => showLevelUp(computeLevel(state.xp).level), 700);
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(ach) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-title').textContent = ach.name;
  document.getElementById('toast-xp').textContent = `+${XP_VALUES[ach.rarity]} XP  ·  ${ach.rarity.toUpperCase()}`;
  const bar = document.getElementById('toast-rarity-bar');
  bar.className = 'toast-rarity-bar ' + ach.rarity;
  bar.classList.remove('shrink'); void bar.offsetWidth; bar.classList.add('shrink');
  const icons = { common:'🏅', rare:'💙', epic:'💜', legendary:'👑' };
  toast.querySelector('.toast-icon').textContent = icons[ach.rarity] || '🏆';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ─── LEVEL UP ────────────────────────────────────────────────
function showLevelUp(level) {
  let banner = document.getElementById('levelup-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'levelup-banner';
    banner.className = 'levelup-banner';
    banner.innerHTML = `<div class="levelup-text">LEVEL UP</div><div class="levelup-sub" id="levelup-sub"></div>`;
    document.body.appendChild(banner);
  }
  document.getElementById('levelup-sub').textContent = `YOU ARE NOW LEVEL ${level}`;
  banner.classList.remove('show'); void banner.offsetWidth; banner.classList.add('show');
  playLevelUpBeat();
}

// ═══════════════════════════════════════════════════════════════
//  WEB AUDIO ENGINE — Upgraded cinematic sounds
// ═══════════════════════════════════════════════════════════════
let audioCtx = null;
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function osc(ac, freq, type, startT, dur, vol, freqEnd) {
  const o = ac.createOscillator(), g = ac.createGain();
  o.connect(g); g.connect(ac.destination);
  o.type = type;
  o.frequency.setValueAtTime(freq, startT);
  if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, startT + dur * 0.75);
  g.gain.setValueAtTime(0.001, startT);
  g.gain.linearRampToValueAtTime(vol, startT + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, startT + dur);
  o.start(startT); o.stop(startT + dur + 0.05);
}

function noiseHit(ac, startT, dur, vol, lo=200, hi=4000) {
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * dur), ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const bpf = ac.createBiquadFilter();
  bpf.type = 'bandpass'; bpf.frequency.value = (lo+hi)/2; bpf.Q.value = 0.8;
  const g = ac.createGain();
  src.connect(bpf); bpf.connect(g); g.connect(ac.destination);
  g.gain.setValueAtTime(vol, startT);
  g.gain.exponentialRampToValueAtTime(0.0001, startT + dur);
  src.start(startT); src.stop(startT + dur + 0.05);
}

// COMMON — crisp UI blip with digital sweep
function soundCommon(ac, t) {
  osc(ac, 420,  'square',   t,       0.03, 0.14, 900);
  osc(ac, 900,  'sine',     t+0.03,  0.09, 0.18, 1320);
  osc(ac, 2200, 'sine',     t+0.10,  0.07, 0.07);
  noiseHit(ac, t, 0.025, 0.04, 1200, 5000);
}

// RARE — punchy synth stab, filtered chord, glassy shimmer
function soundRare(ac, t) {
  osc(ac, 75,  'sawtooth', t,       0.14, 0.28, 45);   // sub
  [311, 392, 466, 587].forEach((f,i) => {
    osc(ac, f, 'sawtooth', t+i*0.018, 0.28-i*0.02, 0.13-i*0.01);
  });
  osc(ac, 1244, 'sine', t+0.13, 0.22, 0.09, 1760);
  osc(ac, 1760, 'sine', t+0.18, 0.16, 0.05);
  noiseHit(ac, t+0.015, 0.07, 0.05, 600, 7000);
}

// EPIC — cinematic hit: sub thud + orchestral swell + sparkle
function soundEpic(ac, t) {
  // Sub & kick
  osc(ac, 55, 'sine', t, 0.28, 0.45, 28);
  noiseHit(ac, t, 0.09, 0.18, 60, 400);
  // Distorted power chord
  [110,165,220,277].forEach(f => osc(ac, f, 'sawtooth', t, 0.32, 0.18));
  // Orchestral rise
  [220,330,440,554,659,880,1100].forEach((f,i) => {
    osc(ac, f,   'sine',     t+i*0.042, 0.42-i*0.025, 0.16-i*0.012, f*1.6);
    osc(ac, f*2, 'triangle', t+i*0.042, 0.20,          0.05);
  });
  // Sparkle burst
  for (let i=0;i<6;i++) osc(ac, 1800+i*320, 'sine', t+0.28+i*0.035, 0.14, 0.045-i*0.005);
  noiseHit(ac, t+0.28, 0.10, 0.10, 3000, 12000);
}

// LEGENDARY — full orchestral fanfare + driving beat + sparkle rain
function soundLegendary(ac, t) {
  const step = 60/138; // 138 BPM

  // Kick pattern
  [0, step*2, step*4, step*6].forEach(d => {
    osc(ac, 85, 'sine', t+d, 0.18, 0.52, 26);
    noiseHit(ac, t+d, 0.055, 0.22, 40, 280);
  });
  // Snare on 2 & 4
  [step, step*3, step*5, step*7].forEach(d => {
    noiseHit(ac, t+d, 0.11, 0.32, 180, 9000);
    osc(ac, 210, 'square', t+d, 0.055, 0.12);
  });
  // 16th hi-hats
  for (let i=0;i<16;i++) noiseHit(ac, t+i*(step/2), 0.035, 0.05+(i%2)*0.03, 6000, 14000);

  // Bass line
  [55,55,65,55,55,73,82,55].forEach((f,i) => osc(ac, f, 'sawtooth', t+i*step, step*0.8, 0.3, f*0.92));

  // Power chord stabs
  [[0,[262,330,392]],[step*2,[294,370,440]],[step*4,[330,415,494]],[step*6,[392,494,587]]].forEach(([d,chord]) => {
    chord.forEach(f => osc(ac, f, 'sawtooth', t+d, step*0.85, 0.16));
  });

  // Melodic fanfare
  const mel = [523,659,784,880,1047,880,1047,1319];
  mel.forEach((f,i) => {
    osc(ac, f,   'sine',     t+0.06+i*step*0.8, step*0.7, 0.28);
    osc(ac, f,   'triangle', t+0.06+i*step*0.8, step*0.7, 0.10);
    osc(ac, f*2, 'sine',     t+0.06+i*step*0.8, step*0.4, 0.04);
  });

  // Big final chord
  const fin = t + step*8;
  [262,330,392,523,659,784,1047].forEach(f => osc(ac, f, 'sine', fin, 0.85, 0.22));
  noiseHit(ac, fin, 0.12, 0.20, 300, 10000);
  // Sparkle rain
  for (let i=0;i<12;i++) osc(ac, 1600+Math.random()*2400, 'sine', fin+i*0.035, 0.25, 0.07-i*0.005);
}

function playUnlockSound(rarity) {
  try {
    const ac = getCtx(), t = ac.currentTime;
    ({ common:soundCommon, rare:soundRare, epic:soundEpic, legendary:soundLegendary })[rarity]?.(ac, t);
  } catch(e){}
}

// LEVEL UP BEAT — driving 138 BPM synth beat + victory melody
function playLevelUpBeat() {
  try {
    const ac = getCtx(), t = ac.currentTime;
    const bpm = 138, step = 60/bpm;

    // Kick
    [0,step*2,step*4,step*6].forEach(d => {
      osc(ac, 82, 'sine', t+d, 0.17, 0.5, 26);
      noiseHit(ac, t+d, 0.05, 0.18, 40, 220);
    });
    // Snare
    [step,step*3,step*5,step*7].forEach(d => {
      noiseHit(ac, t+d, 0.10, 0.30, 160, 8000);
      osc(ac, 200, 'square', t+d, 0.055, 0.13);
    });
    // Hi-hats (16ths)
    for (let i=0;i<16;i++) noiseHit(ac, t+i*(step/2), 0.032, 0.055+(i%2)*0.025, 5500, 13000);
    // Open hat accent every bar
    [step*1.5,step*5.5].forEach(d => noiseHit(ac, t+d, 0.18, 0.07, 4000, 11000));

    // Bass line — groovy synth
    const bass = [55,55,65,55,55,82,73,55];
    bass.forEach((f,i) => osc(ac, f, 'sawtooth', t+i*step, step*0.75, 0.28, f*0.94));

    // Chord stabs
    [[0,[262,330,392,523]],[step*4,[330,415,494,659]]].forEach(([d,chord]) => {
      chord.forEach(f => osc(ac, f, 'sawtooth', t+d+0.01, step*0.7, 0.10));
    });

    // Victory melody — two passes, ascending
    const mel1 = [523,659,784,1047,880,1047,784,1319];
    mel1.forEach((f,i) => {
      osc(ac, f,   'square',   t+step*0.5+i*step*0.75, step*0.55, 0.12);
      osc(ac, f,   'sine',     t+step*0.5+i*step*0.75, step*0.55, 0.08);
      osc(ac, f*2, 'triangle', t+step*0.5+i*step*0.75, step*0.30, 0.03);
    });

    // Big final hit + sparkle
    const fin = t + step * 8.1;
    [523,659,784,1047,1319].forEach(f => osc(ac, f, 'sine', fin, 0.9, 0.22));
    osc(ac, 55, 'sine', fin, 0.4, 0.4, 28);
    noiseHit(ac, fin, 0.10, 0.20, 400, 12000);
    for (let i=0;i<10;i++) osc(ac, 1400+Math.random()*2600, 'sine', fin+i*0.04, 0.35, 0.08-i*0.007);

  } catch(e){}
}

// ─── FILTERS & SEARCH ────────────────────────────────────────
function setupFilters() {
  document.querySelectorAll('.filter-btn[data-rarity]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeRarity = btn.dataset.rarity;
      document.querySelectorAll('.filter-btn[data-rarity]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });
  document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCat = btn.dataset.cat;
      document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active-cat'));
      btn.classList.add('active-cat');
      document.getElementById('area-title').textContent =
        activeCat==='all' ? 'ALL ACHIEVEMENTS' : btn.textContent.trim().toUpperCase();
      renderGrid();
    });
  });
  document.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeStatus = btn.dataset.status;
      document.querySelectorAll('.filter-btn[data-status]').forEach(b => b.classList.remove('active-status'));
      btn.classList.add('active-status');
      renderGrid();
    });
  });
  document.getElementById('search-input').addEventListener('input', e => {
    searchTerm = e.target.value.trim(); renderGrid();
  });
  document.getElementById('sort-select').addEventListener('change', e => {
    sortMode = e.target.value; renderGrid();
  });
}

// ─── MODAL ───────────────────────────────────────────────────
function setupModal() {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('btn-settings').addEventListener('click', () => {
    document.getElementById('name-input').value = state.playerName==='UNKNOWN' ? '' : state.playerName;
    overlay.classList.add('open');
  });
  document.getElementById('btn-close-modal').addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target===overlay) overlay.classList.remove('open'); });
  document.getElementById('btn-save-name').addEventListener('click', () => {
    const val = document.getElementById('name-input').value.trim();
    if (val) { state.playerName = val.toUpperCase(); saveState(); updateHUD(); }
    overlay.classList.remove('open');
  });
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Reset ALL progress? This cannot be undone.')) {
      state = { playerName:'UNKNOWN', unlocked:{}, xp:0, level:1 };
      saveState(); updateHUD(); renderGrid(); overlay.classList.remove('open');
    }
  });
}

// ─── INIT ─────────────────────────────────────────────────────
function init() {
  loadState();
  setupFilters();
  setupModal();
  renderGrid();
  updateHUD();
  if (state.playerName === 'UNKNOWN')
    setTimeout(() => document.getElementById('modal-overlay').classList.add('open'), 800);
  requestAnimationFrame(() => {
    const { xpInLevel, xpNeeded } = computeLevel(state.xp);
    document.getElementById('xp-bar-fill').style.width =
      Math.min(100, Math.round((xpInLevel/xpNeeded)*100)) + '%';
  });
}

document.addEventListener('DOMContentLoaded', init);
