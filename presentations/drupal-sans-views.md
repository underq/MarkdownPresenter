Drupal without Views ?
======================

![Nescafe](http://zengenuity.com/sites/default/files/drupal_latte_500.jpg)

###_What else !_

!

Drupal Graph
------------

![Drupal](presentations/img/drupal_work.png)

!

Views Graph
-----------

![Views](presentations/img/views_work.png)

!

print 'I use ' . $views;
========================

> The Views module provides a flexible method for Drupal site designers to control how lists and tables of content, users, taxonomy terms and other data are presented.

> This tool is essentially a smart query builder that, given enough information, can build the proper query, execute it, and display the results.
> It has four modes, plus a special mode, and provides an impressive amount of functionality from these modes.

_[Source : Views project page.](http://drupal.org/project/views)_

!

Special mode WTF!
-----------------

![Vache](presentations/img/special_mode.jpg)

!

try { $views }
==============

Maitriser son application
-------------------------

<table>
	<tbody>
		<tr>
			<td colspan="2">Les informations affichées</td>
		</tr>
		<tr>
			<td><img src="presentations/img/date_info.png" /></td>
			<td><pre><code class="php bash">print date('Y-m-d');</code></pre></td>
		</tr>
		<tr>
			<td colspan="2">Les requetes SQL</td>
		</tr>
		<tr>
			<td>NULL</td>
			<td>Next Page</td>
		</tr>
	</tbody>
</table>

!

Next Page
---------

<pre class="petit"><code class="sql">SELECT 
	SUM(IF(term_node.tid = 34 OR term_node.tid = 35 OR term_node.tid = 37, 1, NULL)) as "valid",
    SUM(IF(term_node.tid = 32 OR term_node.tid = 33, 1, NULL)) as "checking",
    SUM(IF(term_node.tid = 30 OR term_node.tid = 31 OR term_node.tid = 38, 1, NULL)) as "invalid",
    alg_docs.docs_quitus
FROM {node} node
INNER JOIN {term_node} term_node
    ON term_node.vid = node.vid
INNER JOIN {term_data} term_data
    ON term_data.tid = term_node.tid
INNER JOIN {alg_docs} alg_docs
    ON alg_docs.docs_content_type = node.type
LEFT JOIN {content_field_op_docs_add} content_field_op_docs_add
    ON content_field_op_docs_add.field_op_docs_add_value = alg_docs.docs_id
LEFT JOIN {content_field_operations} content_field_operations
    ON content_field_operations.vid = node.vid
WHERE term_data.vid = 23
AND node.uid = (
    SELECT * FROM (
        SELECT node.uid
        FROM og_subgroups
        INNER JOIN og_uid
            ON og_uid.nid = og_subgroups.parent
        INNER JOIN node
            ON node.nid = og_subgroups.parent
        WHERE og_subgroups.gid = %d
        AND node.type = "entreprise"
        LIMIT 1) tmp_entreprise_uid
	AND (
		(content_field_operations.field_operations_nid = %d AND alg_docs.docs_quitus = "OP") OR
		(content_field_op_docs_add.nid = %d AND alg_docs.docs_quitus = "COMP") OR
		(content_field_operations.field_operations_nid IS NULL AND alg_docs.docs_quitus IN ("ASS", "CT"))
	)
)</code></pre>

!

Gagner du temps
---------------

### Retour d'experience.

+ Durée de formation 1 jour avec Léon
+ 6 Mois d'utilisation de Views
+ 1 Jour de formation sur l'API drupal
+ 3 Mois pour remplacer tous les Views
+ Aussi longtemps que l'utilisation de Drupal

!

Industrialiser son application
------------------------------

### Avec Views.

<pre><code class="bash">drush en feature
drush features-export
git push origin master
git pull origin master
drush features-update-all
</code></pre>


### Sans Views.

<pre><code class="bash">git push origin master
git pull origin master
</code></pre>

!

Views coute cher
----------------

+ Views initialise tous les display.
<pre><code class="php">// Load the view and render it.
if ($view = views_get_view($name)) {
  return $view->execute_display($display_id, $args);
}
</code></pre>
+ Views consome des requetes et de la memoire
Executed 59 queries in 3770.44 ms.
<pre><code class="bash">
devel_boot()=2.75 MB, devel_shutdown()=30.13 MB.
</code></pre>

+ L'impacte de views, ctool, features :
  + Si activé, page d'accueil : 21.45 MB
  + Si désactivé, page d'accueil : 19.97 MB

!

catch (ViewsException $e)
=========================

### unset($views);
### print 'I prefere ' . $api;

!

use Drupal\\Core\\DrupalKernel;
===============================

+ db\_query(), db\_select()
+ hook\_menu
+ hook\_block
+ theme('table')
+ theme('list')
+ hook\_theme()
+ [Render Arrays](http://drupal.org/node/930760)

!

\+ des modules personnalisés
============================

+ [Custom Blocks Base](http://drupal.org/sandbox/rballou/1630472)  
http://drupal.org/sandbox/rballou/1630472
  
+ [Block Router](http://drupal.org/sandbox/underq/1494508)  
http://drupal.org/sandbox/underq/1494508

!

Block Router
============

### Retour d'experience.

+ Remplacer les views par des blocks
+ 1 Interface pour N blocks
+ 1 Block == 1 Classe == 1 Fichier
+ Tous les parametres versionnables
+ Une API simple
+ Le plus performant possible
+ Gestion du cache
+ Exportable et sans dependance

!

Que peut on faire avec views
============================

> You need Views if  

> You like the default front page view, but you find you want to sort it differently.  
> You like the default taxonomy/term view, but you find you want to sort it differently.  
> You like the idea of the 'article' module, but it doesn't display articles the way you like.  
> You want a way to display a block with the 5 most recent posts of some particular type.  
> Views can do a lot more than that, but those are some of the obvious uses of Views.  

_[Source : Views project page.](http://drupal.org/project/views)_

!

You like the default front page view, but you find you want to sort it differently. (1/2)
-----------------------------------------------------------------------------------------

<pre><code class="php">#Get all nids.
$select = db_select('node', 'n')
  ->fields('n', array('nid', 'sticky', 'created'))
  ->condition('promote', 1)
  ->condition('status', 1)
  ->extend('PagerDefault')
  ->limit(variable_get('default_nodes_main', 10))
$nids = $select->execute()->fetchCol();  
#Load node and prepare $build.
$nodes = node_load_multiple($nids);
$build = node_view_multiple($nodes);
$build['pager'] = array(
  '#theme' => 'pager',
  '#weight' => 5,
);
return $build;
</code></pre>

!

You like the default front page view, but you find you want to sort it differently. (2/2)
-----------------------------------------------------------------------------------------

Views stat.

!

You like the default taxonomy/term view, but you find you want to sort it differently. (1/2)
--------------------------------------------------------------------------------------------

<pre><code class="php">#Get all nids.
$nids = taxonomy_select_nodes($term->tid, TRUE,
			variable_get('default_nodes_main', 10));
#Load node and prepare $build.
$nodes = node_load_multiple($nids);
$build += node_view_multiple($nodes);
$build['pager'] = array(
  '#theme' => 'pager',
  '#weight' => 5,
);
return $build;
</code></pre>

!

You like the default taxonomy/term view, but you find you want to sort it differently. (2/2)
--------------------------------------------------------------------------------------------

<pre><code class="bash"># Page généré par Views.
Executed 87 queries in 7410.77 ms.
Page execution time was 8119.94 ms.
devel_boot()=3.59 MB, devel_shutdown()=30.18 MB.
</code></pre>

<pre><code class="bash"># Page de base de la taxonomy.
Executed 66 queries in 71.37 ms.
Page execution time was 479.23 ms.
devel_boot()=3.59 MB, devel_shutdown()=21.55 MB.
</code></pre>

!

Conclusion
==========

+ Qui utilise Views ?
+ Qui à déja etait frustrer par views ? 
+ Qui à déja fait du code custom pour hacker une view ?

!

Questions ?
===========
