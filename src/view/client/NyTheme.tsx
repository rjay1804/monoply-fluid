interface SquareThemeData {
  readonly name: string;
  readonly icon?: string;
  readonly price: number;
}

export const NyThemeData = new Map<number, SquareThemeData>();
NyThemeData.set(1, { name: "<- Go", price: 40});
NyThemeData.set(2, { name: "Gravesend", price: 40 });
NyThemeData.set(4, { name: "Sheepshead bay", price: 40});

NyThemeData.set(5, { name: "Governors Island", price: 40});

NyThemeData.set(6, { name: "JFK" , price: 50});


NyThemeData.set(7, { name: "Canarsie"  , price: 50});
NyThemeData.set(9, { name: "Brownsville"  , price: 50});
NyThemeData.set(10, { name: "Bushwick"  , price: 50});

NyThemeData.set(12, { name: "Forest Hills"  , price: 90});
NyThemeData.set(14, { name: "Rego Park", price: 90} );
NyThemeData.set(15, { name: "Astoria", price: 90} );

NyThemeData.set(16, { name: "Newark" , price: 90});

NyThemeData.set(17, { name: "Dumbo" , price: 90});
NyThemeData.set(18, { name: "MTA", icon: "subway" , price: 50});
NyThemeData.set(19, { name: "Clinton Hill" , price: 50});
NyThemeData.set(20, { name: "Park Slope" , price: 50});

NyThemeData.set(22, { name: "Hell's Kitchen" , price: 115});
NyThemeData.set(24, { name: "Chelsea" ,price: 45});
NyThemeData.set(25, { name: "West Village" ,price: 45});

NyThemeData.set(26, { name: "La Guardia" ,price: 45});

NyThemeData.set(27, { name: "Gramercy" ,price: 45});
NyThemeData.set(29, { name: "Chinatown" ,price: 15});
NyThemeData.set(30, { name: "Greenwich Village" ,price: 15});

NyThemeData.set(32, { name: "Times Square" ,price: 15});
NyThemeData.set(34, { name: "Midtown" ,price: 15});
NyThemeData.set(35, { name: "Columbus Circle" , price: 15});

NyThemeData.set(36, { name: "Albany" , price: 115});

NyThemeData.set(37, { name: "Con Edison" , price: 115});

NyThemeData.set(38, { name: "Tribeca" , price: 115});
NyThemeData.set(40, { name: "Wall Street" , price: 115});
