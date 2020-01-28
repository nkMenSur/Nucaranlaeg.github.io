UserPermission = Permission.PLAYER;

setTimeout(() => {
	mapbox = document.querySelector("#mapbox");
	
	mapbox.addEventListener("click", e => {
		islandNumber = e.target.parentNode.parentNode.id.replace("island", "");
		if (islandNumber) loadIslandInfo(chanceries[islandNumber]);
	});
}, 0);

function loadIslandInfo(chancery) {
	if (!(chancery.permission & UserPermission)) return;
	colselect(0)
	infobox = document.querySelector("#infobox");
	infobox.classList.add("active");
	infobox.querySelector("#info-name").innerHTML = chancery.name;
	infobox.querySelector("#info-desc").innerHTML = chancery.description + (Permission.DM & UserPermission ? chancery.DMdesc : "");
	peopleDiv = infobox.querySelector("#info-people-list");
	while (peopleDiv.firstChild){
		peopleDiv.removeChild(peopleDiv.firstChild);
	}
	chancery.people.forEach(person => {
		if (!(person.permission & UserPermission)) return;
		personDiv = document.querySelector("#template-person").cloneNode(true);
		personDiv.id = "person" + person.id;
		personDiv.querySelector(".person-name").innerHTML = person.name;
		personDiv.querySelector(".person-title").innerHTML = person.title;
		personDiv.querySelector(".person-button").addEventListener("click", e => {
			personNumber = e.target.parentNode.id.replace("person", "");
			loadPersonInfo(allpeople[personNumber]);
		});
		peopleDiv.append(personDiv);
	});
	document.querySelector("#inner-infobox").style.left = "0";
}

function loadPersonInfo(person) {
	peoplebox = document.querySelector("#info-people");
	peoplebox.style.display = "inline-block";
	peoplebox.querySelector("#info-people-title").innerHTML = person.title;
	peoplebox.querySelector("#info-people-name").innerHTML = person.name;
	peoplebox.querySelector("#info-people-desc").innerHTML = person.description;
	document.querySelector("#inner-infobox").style.left = "-100%";
	itemsDiv = infobox.querySelector("#info-items-list");
	while (itemsDiv.firstChild){
		itemsDiv.removeChild(itemsDiv.firstChild);
	}
	person.items.forEach(item => {
		if (!(item.permission & UserPermission)) return;
		itemDiv = document.querySelector("#template-item").cloneNode(true);
		itemDiv.id = "item" + item.id;
		itemDiv.querySelector(".item-name").innerHTML = item.name;
		itemDiv.querySelector(".item-price").innerHTML = item.buy;
		itemDiv.querySelector(".item-button").addEventListener("click", e => {
			itemNumber = e.target.parentNode.id.replace("item", "");
			loadItemInfo(allitems[itemNumber]);
		});
		itemsDiv.append(itemDiv);
	});
}

function loadItemInfo(item) {
	itembox = document.querySelector("#info-items");
	itembox.style.display = "inline-block";
	itembox.querySelector("#info-items-name").innerHTML = item.name;
	itembox.querySelector("#info-items-desc").innerHTML = item.description;
	document.querySelector("#inner-infobox").style.left = "-200%";
}

function colselect(column){
	if (column === 0){
		document.querySelector("#inner-infobox").style.left = "0";
		setTimeout(() => {
			document.querySelector("#info-people").style.display = "none";
			document.querySelector("#info-items").style.display = "none";
		}, 250);
	} else {
		infobox = document.querySelector("#inner-infobox");
		left = infobox.style.left;
		left = +left.slice(0, 4) + 100;
		infobox.style.left = left + "%";
	}
}

function clean(node) {
	for(let n = 0; n < node.childNodes.length; n++) {
		let child = node.childNodes[n];
		if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
			node.removeChild(child);
			n--;
		} else if(child.nodeType === 1) {
			clean(child);
		}
	}
}

setTimeout(() => {
	clean(document.querySelector("#templates"));
}, 0);