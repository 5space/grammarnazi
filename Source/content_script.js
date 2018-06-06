var dict = getDictionary();

walk(document.body);

function walk(node) 
{
        // I stole this function from here:
        // http://is.gd/mwZp7E
        
        var child, next;

        switch ( node.nodeType )  
        {
                case 1:  // Element
                case 9:  // Document
                case 11: // Document fragment
                        child = node.firstChild;
                        while ( child ) 
                        {
                                next = child.nextSibling;
                                walk(child);
                                child = next;
                        }
                        break;

                case 3: // Text node
                        handleText(node);
                        break;
        }
}

function handleText(textNode){
	var v = textNode.nodeValue;
	for(var i = 0; i < dict.length; i++){
		v = v.replace(dict[i].regexp, function(match, p1, offset, string) {
			var replacementText 
			// if replacment2 exists and 50% chance use replacement2
			if(typeof dict[i].replacement2 != "undefined" && Math.random() < 0.5) replacementText = dict[i].replacement2;
			else replacementText = dict[i].replacement1;
			if(p1.length > 0 && p1 === p1.toUpperCase()){
				replacementText = replacementText.charAt(0).toUpperCase() + replacementText.slice(1);
			}
			if(typeof dict[i].skip != "undefined") i += dict[i].skip;
			return replacementText;
		});
		textNode.nodeValue = v;
	}
}

function wordPair(regexp, replacement1, skip, replacement2){
	this.regexp=regexp;
	this.replacement1=replacement1;
	this.replacement2=replacement2;
	this.skip=skip;
}

function getDictionary(){
	var dictionary = new Array();
	dictionary.push(new wordPair(/\b(T|t)hey're\b/g, "their", 2, "there"));
	dictionary.push(new wordPair(/\b(T|t)heir\b/g, "they're", 1, "there"));
	dictionary.push(new wordPair(/\b(T|t)here\b/g, "they're", 0, "their"));
	dictionary.push(new wordPair(/\b(Y|y)our\b/g, "you're", 1));
	dictionary.push(new wordPair(/\b(Y|y)ou're\b/g, "your"));
	dictionary.push(new wordPair(/\b(R|r)egardless\b/g, "irregardless"));
	dictionary.push(new wordPair(/\b(I|i)t's\b/g, "its", 1));
	dictionary.push(new wordPair(/\b(I|i)ts\b/g, "it's"));
	dictionary.push(new wordPair(/\b(T|t)hen\b/g, "than", 1));
	dictionary.push(new wordPair(/\b(T|t)han\b/g, "then"));
	dictionary.push(new wordPair(/\b(S|s)hould have\b/g, "should of"));
	dictionary.push(new wordPair(/\b(W|w)ould have\b/g, "would of"));
	dictionary.push(new wordPair(/\b(C|c)ould have\b/g, "could of"));
	dictionary.push(new wordPair(/\b(E|e)ffect\b/g, "affect", 1));
	dictionary.push(new wordPair(/\b(A|a)ffect\b/g, "effect"));
	dictionary.push(new wordPair(/\b(L|l)oose\b/g, "lose", 1));
	dictionary.push(new wordPair(/\b(L|l)ose\b/g, "loose"));
	dictionary.push(new wordPair(/\b(C|c)ompliment\b/g, "complement", 1));
	dictionary.push(new wordPair(/\b(C|c)omplement\b/g, "compliment"));
	dictionary.push(new wordPair(/\b(F|f)ewer\b/g, "less", 1));
	dictionary.push(new wordPair(/\b(L|l)ess\b/g, "fewer"));
	dictionary.push(new wordPair(/\b(H|h)istoric\b/g, "historical", 1));
	dictionary.push(new wordPair(/\b(H|h)istorical\b/g, "historic"));
	dictionary.push(new wordPair(/\b(P|p)rincipal\b/g, "principle", 1));
	dictionary.push(new wordPair(/\b(P|p)rinciple\b/g, "principal"));
	dictionary.push(new wordPair(/\b(A|a) lot\b/g, "alot"));

	return dictionary;
}
