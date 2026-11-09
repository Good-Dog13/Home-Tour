/* New house photo tour: the floor plan and the photo spots.
   The easiest way to change this file is the drag-and-drop editor (editor.html).
   To edit by hand: every size is in inches. x runs toward the street (the front of the house);
   y runs from the bedroom wing toward the garage. A photo's "dir" is the way the camera faced:
   0 = toward the street, 90 = toward the garage side, 180 = toward the back, -90 = toward the bedroom wing. */
window.HOUSE = {
  "rooms": [
    {"id": "living-room", "kind": "room", "poly": [[0,0],[158,0],[158,235],[0,235]], "label": [79,118], "lines": ["Living", "Room"]},
    {"id": "foyer", "kind": "room", "poly": [[158,126],[248,126],[248,235],[158,235]], "label": [203,180], "lines": ["Foyer"]},
    {"id": "hall-bathroom", "kind": "room", "poly": [[158,0],[200,0],[200,28],[262,28],[262,86],[238,86],[238,100],[158,100]], "label": [200,62], "lines": ["Hall", "Bath"]},
    {"id": "coat", "kind": "other", "poly": [[158,100],[238,100],[238,126],[158,126]]},
    {"id": "hallway", "kind": "room", "poly": [[120,-51],[262,-51],[262,0],[120,0]], "label": [227,-25], "lines": ["Hallway"], "axis": 0},
    {"id": "hcl1", "kind": "other", "poly": [[176,-77],[224,-77],[224,-51],[176,-51]]},
    {"id": "primary-bedroom", "kind": "room", "poly": [[-96,-216],[120,-216],[120,0],[-96,0]], "label": [12,-108], "lines": ["Primary", "Bedroom"]},
    {"id": "primary-bathroom", "kind": "room", "poly": [[120,-216],[248,-216],[248,-77],[206,-77],[206,-108],[172,-142],[120,-142]], "label": [184,-200], "lines": ["Primary", "Bath"]},
    {"id": "primary-closet", "kind": "room", "poly": [[120,-142],[172,-142],[206,-108],[206,-77],[176,-77],[176,-51],[120,-51]], "label": [160,-98], "lines": ["Primary", "Closet"], "short": ["Closet"]},
    {"id": "bedroom-2", "kind": "room", "poly": [[248,-215],[404,-215],[404,-66],[344,-66],[344,-51],[224,-51],[224,-77],[248,-77]], "label": [326,-133], "lines": ["Bedroom 2"], "short": ["Bedroom", "2"]},
    {"id": "bedroom-3", "kind": "room", "poly": [[262,-51],[344,-51],[344,-36],[404,-36],[404,126],[262,126]], "label": [333,60], "lines": ["Bedroom 3"], "short": ["Bedroom", "3"]},
    {"id": "b2closet", "kind": "other", "poly": [[344,-66],[404,-66],[404,-36],[344,-36]]},
    {"id": "hcl2", "kind": "other", "poly": [[200,0],[262,0],[262,28],[200,28]]},
    {"id": "dining-area", "kind": "room", "poly": [[-138,235],[60,235],[60,385],[-138,385]], "label": [-40,310], "lines": ["Dining", "Area"], "short": ["Dining"]},
    {"id": "kitchen", "kind": "room", "poly": [[60,235],[192,235],[192,381],[216,381],[216,515],[60,515]], "label": [132,440], "lines": ["Kitchen"]},
    {"id": "den", "kind": "room", "poly": [[-318,235],[-138,235],[-138,385],[-318,385]], "label": [-228,310], "lines": ["Den"]},
    {"id": "laundry-room", "kind": "room", "poly": [[192,235],[312,235],[312,325],[192,325]], "label": [252,280], "lines": ["Laundry"], "shortAxis": 0},
    {"id": "pantry", "kind": "other", "poly": [[192,325],[216,325],[216,381],[192,381]]},
    {"id": "garage", "kind": "other", "poly": [[216,325],[470,325],[470,605],[216,605]], "label": [343,470], "lines": ["Garage"]},
    {"id": "store", "kind": "other", "poly": [[60,515],[216,515],[216,605],[60,605]], "label": [138,560], "lines": ["Storeroom"], "axis": 0},
    {"id": "porch1", "kind": "outdoor", "poly": [[-318,0],[0,0],[0,235],[-318,235]], "label": [-238,118], "lines": ["Porch"]},
    {"id": "porch2", "kind": "outdoor", "poly": [[-50,385],[60,385],[60,605],[-50,605]], "label": [5,478], "lines": ["Porch"], "axis": 0}
  ],
  "openings": [
    {"type": "window", "a": [0,21], "b": [0,57], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [0,63], "b": [0,99], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [0,105], "b": [0,141], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [0,147], "b": [0,183], "side": 1, "hinge": "a", "ext": true},
    {"type": "door", "a": [0,202], "b": [0,234], "side": 1, "hinge": "b", "ext": true},
    {"type": "french", "a": [126,0], "b": [158,0], "side": 1, "hinge": "a", "ext": false},
    {"type": "open", "a": [15,235], "b": [192,235], "side": 1, "hinge": "a", "ext": false},
    {"type": "open", "a": [158,126], "b": [158,235], "side": 1, "hinge": "a", "ext": false},
    {"type": "window", "a": [248,147], "b": [248,163], "side": 1, "hinge": "a", "ext": true},
    {"type": "door", "a": [248,163], "b": [248,199], "side": -1, "hinge": "b", "ext": true, "front": true},
    {"type": "window", "a": [248,199], "b": [248,215], "side": 1, "hinge": "a", "ext": true},
    {"type": "bifold", "a": [187,126], "b": [233,126], "side": 1, "hinge": "a", "ext": false},
    {"type": "door", "a": [120,-44], "b": [120,-12], "side": -1, "hinge": "a", "ext": false},
    {"type": "door", "a": [164,0], "b": [196,0], "side": 1, "hinge": "b", "ext": false},
    {"type": "double", "a": [178,-51], "b": [222,-51], "side": 1, "hinge": "a", "ext": false},
    {"type": "door", "a": [226,-51], "b": [258,-51], "side": -1, "hinge": "a", "ext": false},
    {"type": "double", "a": [204,0], "b": [258,0], "side": -1, "hinge": "a", "ext": false},
    {"type": "door", "a": [262,-37], "b": [262,-5], "side": 1, "hinge": "a", "ext": false},
    {"type": "window", "a": [-96,-170], "b": [-96,-134], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [-96,-90], "b": [-96,-54], "side": 1, "hinge": "a", "ext": true},
    {"type": "door", "a": [120,-206], "b": [120,-174], "side": 1, "hinge": "a", "ext": false},
    {"type": "window", "a": [150,-216], "b": [180,-216], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [404,-120], "b": [404,-80], "side": -1, "hinge": "a", "ext": true},
    {"type": "arched", "a": [404,10], "b": [404,70], "side": -1, "hinge": "a", "ext": true},
    {"type": "window", "a": [320,126], "b": [356,126], "side": -1, "hinge": "a", "ext": true},
    {"type": "bifold", "a": [262,88], "b": [262,124], "side": 1, "hinge": "a", "ext": false},
    {"type": "french", "a": [-138,292], "b": [-138,328], "side": -1, "hinge": "a", "ext": false},
    {"type": "door", "a": [20,385], "b": [52,385], "side": -1, "hinge": "a", "ext": true},
    {"type": "open", "a": [60,235], "b": [60,385], "side": 1, "hinge": "a", "ext": false},
    {"type": "window", "a": [60,390], "b": [60,426], "side": 1, "hinge": "a", "ext": true},
    {"type": "door", "a": [192,247], "b": [192,279], "side": 1, "hinge": "a", "ext": false},
    {"type": "double", "a": [192,337], "b": [192,377], "side": -1, "hinge": "a", "ext": false},
    {"type": "window", "a": [-318,262], "b": [-318,294], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [-318,294], "b": [-318,326], "side": 1, "hinge": "a", "ext": true},
    {"type": "window", "a": [-318,326], "b": [-318,358], "side": 1, "hinge": "a", "ext": true},
    {"type": "door", "a": [-176,235], "b": [-144,235], "side": 1, "hinge": "a", "ext": false},
    {"type": "window", "a": [312,262], "b": [312,298], "side": -1, "hinge": "a", "ext": true},
    {"type": "door", "a": [228,325], "b": [264,325], "side": -1, "hinge": "a", "ext": false},
    {"type": "garage", "a": [470,368], "b": [470,560], "side": -1, "hinge": "a", "ext": true},
    {"type": "door", "a": [418,605], "b": [454,605], "side": -1, "hinge": "a", "ext": true},
    {"type": "window", "a": [298,605], "b": [337,605], "side": -1, "hinge": "a", "ext": true},
    {"type": "door", "a": [216,542], "b": [216,578], "side": -1, "hinge": "b", "ext": false},
    {"type": "double", "a": [172,-142], "b": [206,-108], "side": -1, "hinge": "a", "ext": false},
    {"type": "double", "a": [350,-66], "b": [398,-66], "side": -1, "hinge": "a", "ext": false}
  ],
  "fixtures": [
    {"cls": "col", "poly": [[56,230],[66,230],[66,240],[56,240]]},
    {"cls": "col", "poly": [[141,230],[151,230],[151,240],[141,240]]},
    {"cls": "", "poly": [[60,323],[142,323],[168,344],[168,374],[142,374],[124,350],[60,350]]},
    {"cls": "", "poly": [[60,350],[84,350],[84,515],[60,515]]},
    {"cls": "", "poly": [[84,491],[216,491],[216,515],[84,515]]},
    {"cls": "", "poly": [[192,419],[216,419],[216,491],[192,491]]},
    {"cls": "", "poly": [[186,383],[216,383],[216,419],[186,419]]},
    {"cls": "", "poly": [[-138,245],[-124,245],[-124,292],[-138,292]]},
    {"cls": "", "poly": [[-138,328],[-124,328],[-124,375],[-138,375]]},
    {"cls": "closet", "poly": [[238,86],[262,86],[262,126],[238,126]]},
    {"cls": "tub", "poly": [[234,28],[262,28],[262,86],[234,86]]},
    {"cls": "vanity", "poly": [[158,6],[180,6],[180,44],[158,44]]},
    {"cls": "toilet", "poly": [[160,50],[178,50],[178,72],[160,72]]},
    {"cls": "", "poly": [[216,385],[246,385],[246,409],[216,409]]},
    {"cls": "col", "poly": [[-318,0],[-308,0],[-308,10],[-318,10]]},
    {"cls": "col", "poly": [[-318,145],[-308,145],[-308,155],[-318,155]]},
    {"cls": "col", "poly": [[-165,115],[-155,115],[-155,125],[-165,125]]},
    {"cls": "col", "poly": [[-50,435],[-40,435],[-40,445],[-50,445]]},
    {"cls": "shower", "poly": [[206,-113],[248,-113],[248,-77],[206,-77]]}
  ],
  "tour": [
    {"id": "foyer", "name": "Foyer", "photos": [
      {"f": "foyer-1", "x": 40, "y": 190, "dir": 0, "cap": "The front door, seen from the living room"}
    ]},
    {"id": "living-room", "name": "Living Room", "photos": [
      {"f": "living-room-2", "x": 75, "y": 25, "dir": 90, "cap": "Looking across the living room toward the kitchen"},
      {"f": "living-room-3", "x": 130, "y": 20, "dir": 100, "cap": "The kitchen and dining area, past the columns"},
      {"f": "living-room-4", "x": 95, "y": 215, "dir": -85, "cap": "The red doors lead to the bedroom hallway"},
      {"f": "living-room-1", "x": 100, "y": 300, "dir": -88, "cap": "Looking back into the living room from the kitchen"}
    ]},
    {"id": "dining-area", "name": "Dining Area", "photos": [
      {"f": "dining-area-1", "x": -110, "y": 350, "dir": -10, "cap": "From the dining area, looking toward the front of the house"}
    ]},
    {"id": "den", "name": "Den", "photos": [
      {"f": "den-1", "x": -125, "y": 310, "dir": 180, "cap": "Looking into the den from its doorway"},
      {"f": "den-2", "x": -190, "y": 330, "dir": 200, "cap": "The den's big window"},
      {"f": "den-3", "x": -190, "y": 290, "dir": 165, "cap": "The window wall from another angle"}
    ]},
    {"id": "kitchen", "name": "Kitchen", "photos": [
      {"f": "kitchen-2", "x": -110, "y": 285, "dir": 5, "cap": "From the dining area, looking toward the kitchen"},
      {"f": "kitchen-3", "x": 175, "y": 305, "dir": 95, "cap": "Pantry and fridge on the left, stove ahead, sink on the right"},
      {"f": "kitchen-4", "x": 130, "y": 290, "dir": 88, "cap": "The stove wall and the curved counter"},
      {"f": "kitchen-5", "x": 140, "y": 425, "dir": -160, "cap": "From the sink, looking toward the den doors"},
      {"f": "kitchen-6", "x": 95, "y": 430, "dir": -80, "cap": "From the sink, looking out toward the living room"},
      {"f": "kitchen-1", "x": 150, "y": 290, "dir": 180, "cap": "Past the counter toward the dining area and den"},
      {"f": "kitchen-7", "x": 150, "y": 475, "dir": -72, "cap": "The fridge, the pantry doors and the metal accent wall"}
    ]},
    {"id": "laundry-room", "name": "Laundry Room", "photos": [
      {"f": "laundry-room-1", "x": 205, "y": 255, "dir": 5, "cap": "Stepping in through the door in the metal accent wall"},
      {"f": "laundry-room-2", "x": 205, "y": 295, "dir": 0, "cap": "The window at the far end and the door to the garage"},
      {"f": "laundry-room-3", "x": 250, "y": 300, "dir": -90, "cap": "Cabinets, a utility sink and the washer hookups"},
      {"f": "laundry-room-4", "x": 262, "y": 255, "dir": 90, "cap": "Coat hooks beside the door to the garage"}
    ]},
    {"id": "hallway", "name": "Hallway", "photos": [
      {"f": "hallway-1", "x": 142, "y": 25, "dir": -90, "cap": "Through the red doors from the living room"},
      {"f": "hallway-2", "x": 128, "y": -25, "dir": 0, "cap": "From the primary bedroom door, looking toward Bedroom 3"},
      {"f": "hallway-3", "x": 242, "y": -48, "dir": 160, "cap": "The hall bathroom door, with the living room doors beyond"}
    ]},
    {"id": "hall-bathroom", "name": "Hall Bathroom", "photos": [
      {"f": "hall-bathroom-1", "x": 180, "y": 8, "dir": 90, "cap": "From the door, the vanity is on the right and the toilet is past it"},
      {"f": "hall-bathroom-2", "x": 225, "y": 62, "dir": -140, "cap": "The vanity and medicine cabinet, with the door on the right"},
      {"f": "hall-bathroom-5", "x": 230, "y": 50, "dir": 175, "cap": "The toilet and the vanity"},
      {"f": "hall-bathroom-3", "x": 175, "y": 62, "dir": 0, "cap": "The tub and shower"},
      {"f": "hall-bathroom-4", "x": 205, "y": 58, "dir": -5, "cap": "The shower"},
      {"f": "hall-bathroom-6", "x": 200, "y": 92, "dir": -80, "cap": "The tub, with the door on the left"},
      {"f": "hall-bathroom-7", "x": 190, "y": 40, "dir": -95, "cap": "Looking out the door toward the hall closet"}
    ]},
    {"id": "bedroom-2", "name": "Bedroom 2", "photos": [
      {"f": "bedroom-2-1", "x": 242, "y": -64, "dir": -75, "cap": "Looking in from the door"},
      {"f": "bedroom-2-2", "x": 265, "y": -110, "dir": 5, "cap": "The big window"},
      {"f": "bedroom-2-3", "x": 370, "y": -170, "dir": 95, "cap": "The closet and the door to the hall"},
      {"f": "bedroom-2-4", "x": 360, "y": -140, "dir": 100, "cap": "The closet, open"}
    ]},
    {"id": "bedroom-3", "name": "Bedroom 3", "photos": [
      {"f": "bedroom-3-4", "x": 289, "y": -15, "dir": 40, "cap": "Looking in from the hall"},
      {"f": "bedroom-3-2", "x": 285, "y": 100, "dir": -45, "cap": "The arched window"},
      {"f": "bedroom-3-1", "x": 385, "y": 80, "dir": -150, "cap": "The closet doors and the door to the hall"},
      {"f": "bedroom-3-3", "x": 285, "y": 106, "dir": 180, "cap": "Inside the closet"}
    ]},
    {"id": "primary-bedroom", "name": "Primary Bedroom", "photos": [
      {"f": "primary-bedroom-1", "x": 110, "y": -30, "dir": 195, "cap": "From the hall door, looking at the back windows"},
      {"f": "primary-bedroom-6", "x": 60, "y": -180, "dir": 140, "cap": "The wardrobe and the two back windows"},
      {"f": "primary-bedroom-5", "x": 95, "y": -190, "dir": 100, "cap": "The wardrobe, with the hall door on the left"},
      {"f": "primary-bedroom-3", "x": 90, "y": -30, "dir": -125, "cap": "A back window on the left, the TV shelf on the right"},
      {"f": "primary-bedroom-2", "x": 40, "y": -15, "dir": -80, "cap": "The TV shelf, with the bathroom door at the far end"},
      {"f": "primary-bedroom-4", "x": -60, "y": -110, "dir": 0, "cap": "The bathroom door, the TV shelf and the hall door"}
    ]},
    {"id": "primary-bathroom", "name": "Primary Bathroom", "photos": [
      {"f": "primary-bathroom-1", "x": 124, "y": -188, "dir": -55, "cap": "From the bedroom door, the double vanity and the corner tub"},
      {"f": "primary-bathroom-2", "x": 140, "y": -200, "dir": -5, "cap": "The corner tub, the toilet and the shower"},
      {"f": "primary-bathroom-3", "x": 215, "y": -195, "dir": -165, "cap": "The vanity, the glass-block window and the tub"},
      {"f": "primary-bathroom-4", "x": 135, "y": -205, "dir": 50, "cap": "The shower and the doors to the closet"}
    ]},
    {"id": "primary-closet", "name": "Primary Closet", "photos": [
      {"f": "primary-closet-1", "x": 214, "y": -148, "dir": 135, "cap": "Looking into the closet from the bathroom"},
      {"f": "primary-closet-2", "x": 185, "y": -120, "dir": 60, "cap": "The shoe rack just inside the doors"},
      {"f": "primary-closet-5", "x": 135, "y": -105, "dir": 0, "cap": "Shelves along both walls"},
      {"f": "primary-closet-4", "x": 180, "y": -95, "dir": -35, "cap": "The skylight"},
      {"f": "primary-closet-3", "x": 195, "y": -95, "dir": 160, "cap": "A corner of the closet"},
      {"f": "primary-closet-6", "x": 145, "y": -75, "dir": -45, "cap": "Shelves beside the door back to the bathroom"}
    ]}
  ]
};
