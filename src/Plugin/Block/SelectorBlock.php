<?php

namespace Drupal\term_tree_selector\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a Term Tree Selector block.
 *
 * @Block(
 *   id = "term_tree_selector_block",
 *   admin_label = @Translation("Term Tree Selector"),
 * )
 */
class SelectorBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $configuration = $this->getConfiguration();

    $form['vocabulary'] = [
      '#type' => 'textfield',
      '#title' => t('Vocabulary'),
      '#required' => TRUE,
      '#default_value' => !empty($configuration['vocabulary']) ? $configuration['vocabulary'] : '',
    ];

    $form['root_label'] = [
      '#type' => 'textfield',
      '#title' => t('Root Label'),
      '#required' => TRUE,
      '#default_value' => !empty($configuration['root_label']) ? $configuration['root_label'] : '',
    ];

    $form['leaf_label'] = [
      '#type' => 'textfield',
      '#title' => t('Leaf Label'),
      '#required' => TRUE,
      '#default_value' => !empty($configuration['leaf_label']) ? $configuration['leaf_label'] : '',
    ];

    $form['leaf_level'] = [
      '#type' => 'select',
      '#title' => t('Leaf Level'),
      '#required' => TRUE,
      '#options' => [
        '2' => 'Second',
        '3' => 'Third',
      ],
      '#default_value' => !empty($configuration['leaf_level']) ? $configuration['leaf_level'] : '',
    ];

    $form['description'] = [
      '#type' => 'textfield',
      '#title' => t('Description'),
      '#required' => TRUE,
      '#default_value' => !empty($configuration['description']) ? $configuration['description'] : '',
    ];

    $form['submit_label'] = [
      '#type' => 'textfield',
      '#title' => t('Submit Label'),
      '#required' => TRUE,
      '#default_value' => !empty($configuration['submit_label']) ? $configuration['submit_label'] : '',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->setConfigurationValue('vocabulary', $form_state->getValue('vocabulary'));
    $this->setConfigurationValue('root_label', $form_state->getValue('root_label'));
    $this->setConfigurationValue('leaf_label', $form_state->getValue('leaf_label'));
    $this->setConfigurationValue('leaf_level', $form_state->getValue('leaf_level'));
    $this->setConfigurationValue('description', $form_state->getValue('description'));
    $this->setConfigurationValue('submit_label', $form_state->getValue('submit_label'));
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $block_configuration = $this->getConfiguration();
    return [
      '#theme' => 'term_tree_selector',
      '#vocabulary' => $block_configuration['vocabulary'],
      '#root_label' => $block_configuration['root_label'],
      '#leaf_label' => $block_configuration['leaf_label'],
      '#leaf_level' => $block_configuration['leaf_level'],
      '#description' => $block_configuration['description'],
      '#submit_label' => $block_configuration['submit_label'],
      '#attached' => [
        'library' => ['term_tree_selector/selector'],
      ]
    ];
  }

}
