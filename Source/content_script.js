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
		v = v.replace(dict[i].regexp, function(match, p1, p2, p3, offset, string) {
			var replacementText = dict[i].replacement;
			if(p1.length > 0 && p1 === p1.toUpperCase()){
				replacementText = replacementText.charAt(0).toUpperCase() + replacementText.slice(1);
			}
			return replacementText;
		});
		textNode.nodeValue = v;
	}
}

function wordPair(regexp, replacement1, replacement2){
	this.regexp=regexp;
	this.replacement=replacement;
	this.replacement2=replacement2
}

function getDictionary(){
	var dictionary = new Array();
	dictionary.push(new wordPair(/\b(T|t)hey're\b/g, "their", "there"));
	dictionary.push(new wordPair(/\b(T|t)heir\b/g, "they're", "there"));
	dictionary.push(new wordPair(/\b(T|t)here\b/g, "they're", "their"));
	dictionary.push(new wordPair(/\b(Y|y)our\b/g, "you're"));
	dictionary.push(new wordPair(/\b(Y|y)ou're\b/g, "your"));
	dictionary.push(new wordPair(/\b(R|r)egardless\b/g, "irregardless"));
	dictionary.push(new wordPair(/\b(I|i)t's\b/g, "its"));
	dictionary.push(new wordPair(/\b(I|i)ts\b/g, "it's"));
	dictionary.push(new wordPair(/\b(T|t)hen\b/g, "than"));
	dictionary.push(new wordPair(/\b(T|t)han\b/g, "then"));
	dictionary.push(new wordPair(/\b(S|s)hould have\b/g, "should of"));
	dictionary.push(new wordPair(/\b(W|w)hould have\b/g, "whould of"));
	dictionary.push(new wordPair(/\b(C|c)hould have\b/g, "chould of"));
	dictionary.push(new wordPair(/\b(E|e)ffect\b/g, "affect"));
	dictionary.push(new wordPair(/\b(A|a)ffect\b/g, "effect"));
	dictionary.push(new wordPair(/\b(L|l)oose\b/g, "lose"));
	dictionary.push(new wordPair(/\b(L|l)ose\b/g, "loose"));
	dictionary.push(new wordPair(/\b(C|c)ompliment\b/g, "complement"));
	dictionary.push(new wordPair(/\b(C|c)omplement\b/g, "compliment"));
	dictionary.push(new wordPair(/\b(F|f)ewer\b/g, "less"));
	dictionary.push(new wordPair(/\b(L|l)ess\b/g, "fewer"));
	dictionary.push(new wordPair(/\b(H|h)istoric\b/g, "historical"));
	dictionary.push(new wordPair(/\b(H|h)istorical\b/g, "historic"));
	dictionary.push(new wordPair(/\b(P|p)rincipal\b/g, "principle"));
	dictionary.push(new wordPair(/\b(P|p)rinciple\b/g, "principal"));

	return dictionary;
}